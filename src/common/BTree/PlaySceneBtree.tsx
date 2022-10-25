/** @jsxRuntime classic */
/** @jsx BtreeJSX */
import BtreeJSX, {FunctionCall, Lotto, NodeState, Parallel, Root, Selector, Sequence, Wait, wrapActionNode} from 'jsxBtree';
import {GameExtended} from "../../gameExtended";
import PlayScene from "../../PlayScene";
import {CONST_MAX_GAME_SPEED} from "../Constants";
import {fadeBetweenScenes} from "../utils";
import {GameRouter} from "../GameRouter";
import GameManagerSingleton, {TEMPLATE_GEN_TYPE} from "../GameManagerSingleton";
import {EventType} from "../Event";
import LevelTemplateFlatLoopPrefab from "../../prefabs/levelTemplates/LevelTemplateFlatLoopPrefab";


interface ActionPlaySoundParams {
    sndKey: string,
    waitTilDone?: boolean
    sndConf: {
        mute?: boolean,
        volume?: number,
        rate?: number,
        detune?: number,
        seek?: number,
        loop?: boolean,
        delay?: number
    };
}



export default function PlaySceneBtree(props) {

    let bb = props.blackboard;
    let game = bb.game as GameExtended;
    let scene = game.gameManager.getCurrentScene() as PlayScene;
    let hero = scene.hero;
    let getHeroBody = () => scene.hero.body as Phaser.Physics.Arcade.Body;

    let foundBoundForRemoval = null

    let incGameScore = () => {
        game.gameManager.score+= (10)// + (10 / game.gameManager.gameSpeed);
        scene.hUDPanelPrefabInst.scoreText.text = "Donations:$" + game.gameManager.score.toFixed(0);
        scene.hUDPanelPrefabInst.kMText.text = "Distance:" + game.gameManager.distance.toFixed(1) + "km/750";
        GameManagerSingleton.updateHud(game);
    }

    let incGameSpeed = () => {
        if(game.gameManager.gameSpeed < CONST_MAX_GAME_SPEED)
            game.gameManager.gameSpeed += 0.01;

        game.gameManager.distance += (game.gameManager.gameSpeed / 25);

    }

    let spawnText = (text) => {
        let pos = hero.getTopCenter();
        pos.y -= 16;
        game.addEvent({
            type: EventType.text,
            actor: hero,
            element: null,
            pos,
            dir: null,
            options: {text}
        });
    }


    function HandleGameLoopSequence(props) {
        return (
            <Sequence {...props} cond={() => !hero.animStateMachine.isCurrentState('died')}>
                <Wait duration={10} exit={() => { incGameSpeed() }} />
                <Wait duration={100} exit={() => { incGameScore() }} />
            </Sequence>
        );
    }

    function HandleInstDeathSequence(props) {
        return (
            <Sequence {...props} cond={() => hero.y > 416 && !hero.animStateMachine.isCurrentState('died')}>
                <FunctionCall fn={() => { game.gameManager.stopGameScroll(); }}/>
                <ActionPlaySound sndKey={'death-fall'} waitTilDone={true} sndConf={{ volume: 0.2 }} />
                <FunctionCall fn={() => {
                    hero.animStateMachine.setState('died');
                }}/>
            </Sequence>
        )
    }

    function HandleMilestoneCutsceneSequence(props) {
        return (
            <Selector {...props} >
                <HandleCutSceneSetup
                    cond={() => game.gameManager.distance > 1 && Math.ceil(game.gameManager.distance) % 50 === 0 && Math.ceil(game.gameManager.distance) !== 750}
                />
            </Selector>

        )
    }


    function HandleCheerFromEnergy(props) {
        return (
            <Sequence {...props}>
                <Selector exit={() => { game.gameManager.energy = 0; }}>
                    <Sequence cond={() => Boolean(game.gameManager.energy === 0)}>
                        <ActionPeterStupidSpeak text={`You guys suck!`} />
                        <ActionConnorSpeak text={`Worst cheer ever.`} />
                        <ActionChrisSpeak text={`Last time I take him anywhere...`} />
                        <FunctionCall fn={() => {  spawnText("-$10,000"); game.gameManager.score -= 10000 }} />
                    </Sequence>
                    <Sequence cond={() => Boolean(game.gameManager.energy === 1)}>
                        <ActionPeterStupidSpeak text={`Are you guys even trying?`} />
                        <ActionConnorSpeak text={`You can do better than that.`} />
                        <ActionChrisSpeak text={`How about you bike and I relax in the van?`} />
                        <FunctionCall fn={() => {  spawnText("-$1,000"); game.gameManager.score -= 1000 }} />
                    </Sequence>
                    <Sequence cond={() => Boolean(game.gameManager.energy === 2)}>
                        <ActionPeterStupidSpeak text={`Go team!`} />
                        <ActionConnorSpeak text={`That was mid.`} />
                        <ActionChrisSpeak text={`Have you considered acting classes?`} />
                        <FunctionCall fn={() => {  spawnText("+$10"); game.gameManager.score += 10 }} />
                    </Sequence>
                    <Sequence cond={() => Boolean(game.gameManager.energy === 3)}>
                        <ActionPeterSpeak text={`You guys rock!`} />
                        <ActionConnorSpeak text={`Cheers.`} />
                        <ActionChrisSpeak text={`Thanks Pete!`} />
                        <FunctionCall fn={() => {  spawnText("+$100"); game.gameManager.score += 100 }} />
                    </Sequence>
                    <Sequence cond={() => Boolean(game.gameManager.energy === 4)}>
                        <ActionPeterSpeak text={`YOU GUYS ARE CRUSHING IT!`} />
                        <ActionConnorSpeak text={`Let's GO!`} />
                        <ActionChrisSpeak text={`Let's GO!`} />
                        <FunctionCall fn={() => {  spawnText("+$1,000"); game.gameManager.score += 1000 }} />
                    </Sequence>
                    <Sequence cond={() => Boolean(game.gameManager.energy === 5)}>
                        <Lotto>
                            <Sequence>
                                <ActionPeterSpeak text={`BEERS ARE ON ME TONIGHT FELLAS!!`} />
                                <ActionConnorSpeak text={`OH GOD, YES!!!!`} />
                                <ActionChrisSpeak text={`Better get the fried chicken too!`} />
                            </Sequence>
                            <Sequence>
                                <ActionPeterSpeak text={`Legend has it there is a smoking hot babe at the end of this cycle...`} />
                                <ActionConnorSpeak text={`Let's GO!!!!`} />
                                <ActionChrisSpeak text={`Connor wait up!`} />
                            </Sequence>
                        </Lotto>
                        <FunctionCall fn={() => { spawnText("+$10,000"); game.gameManager.score += 10000 }} />
                    </Sequence>
                </Selector>
                <ActionCloseDialog />
                <ActionTween waitForCompletion={true} tweenConfig={() => ({
                    targets: [scene.bikes],
                    x: 560,
                    duration: 1500
                })} />
                <FunctionCall fn={() => {game.gameManager.distance += 1} }/>
            </Sequence>
        );
    }

    function resetSceneTemplatesToLoop() {

        scene.enemyCollisionGroup.getChildren().forEach((obstacle: any) => {
            scene.enemyCollisionGroup.killAndHide(obstacle);
            obstacle.destroy();
        })

        scene.staticPhysicsItemsGroup.getChildren().forEach((obstacle: any) => {
            scene.staticPhysicsItemsGroup.killAndHide(obstacle);
            obstacle.destroy();
        })
        scene.enemyCollisionGroup.clear(true, true);
        scene.staticPhysicsItemsGroup.clear(true, true);
        scene.templateBoundsGroup.clear(true, true);
        scene.pillarsGroup.clear(true, true);


        let levelTemplateInst = new LevelTemplateFlatLoopPrefab(scene, 240, 0);
        scene.level_layer.add(levelTemplateInst);
        levelTemplateInst.parentLayer = scene.level_layer;
        levelTemplateInst.awake();
    }


    function HandleCutSceneSetup(props) {
        return (
            <Sequence {...props}>
                <ActionDisableControls />

                <Sequence step={() => { scene.warpTileSprite.tilePositionX += 32; }}>
                    <FunctionCall fn={() => {
                        scene.sound.play('sfxAfterBurner', {volume: 0.2});
                        hero.angle = 0;
                        scene.speed_effect_layer.visible = true;
                        getHeroBody().setAllowGravity(false);
                        scene.physics.world.disableBody(getHeroBody());
                        resetSceneTemplatesToLoop()
                    }}/>
                    <FunctionCall fn={() => { game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.LOOPING_FLAT) }}/>
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: [hero],
                        x: 96,
                        y: 382,
                        duration: 1000
                    })} />
                    <Wait duration={3000} />
                </Sequence>
                <FunctionCall fn={() => {
                    scene.speed_effect_layer.visible = false;
                    scene.physics.world.enableBody(hero);
                    getHeroBody().setAllowGravity(true);
                }}/>

                <Parallel>
                    <ActionPeterSpeak text={'Hey guys!'} />
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: [scene.bikes],
                        x: 248,
                        duration: 2000
                    })} />
                </Parallel>


                {/* do level specific cutscenes here */}
                <HandleCheerFromEnergy />
                <ActionEnableControls exit={() => {
                    game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.RANDOM_0);
                }}/>
            </Sequence>
        );
    }

    function HandleGameCompleteSequence(props) {
        return (
            <Sequence {...props} cond={() => game.gameManager.distance >= 750 }>
                <ActionDisableControls />
                <Sequence step={() => { scene.warpTileSprite.tilePositionX += 32; }}>
                    <FunctionCall fn={() => {
                        scene.sound.play('sfxAfterBurner', {volume: 0.2});
                        hero.angle = 0;
                        scene.speed_effect_layer.visible = true;
                        getHeroBody().setAllowGravity(false);
                        scene.physics.world.disableBody(getHeroBody());
                        resetSceneTemplatesToLoop()
                    }}/>
                    <FunctionCall fn={() => { game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.LOOPING_FLAT) }}/>
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: [hero],
                        x: 96,
                        y: 382,
                        duration: 1000
                    })} />
                    <ActionPeterSpeak text={"We did it boys!"} />
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: [scene.bikes],
                        x: 248,
                        duration: 1000
                    })} />
                    <Wait duration={4000} />
                    <FunctionCall fn={() => {
                        fadeBetweenScenes(game, GameRouter.PlayScene.key, GameRouter.GameCompleteScene.key);
                        scene.BTreeManager.removeTree(scene.BTree);
                    }}/>
                </Sequence>
            </Sequence>
        )
    }

    function HandleDeathSequence(props) {
        return (
            <Sequence {...props} cond={() => hero.animStateMachine.isCurrentState('died')}>
                <FunctionCall fn={() => {
                    fadeBetweenScenes(game, GameRouter.PlayScene.key, GameRouter.GameOverScene.key);
                    scene.BTreeManager.removeTree(scene.BTree);
                }}/>
            </Sequence>
        )
    }

    function ActionTween(props: {waitForCompletion: boolean, tweenConfig: any}) {
        return wrapActionNode('ActionTween', (node) => {
            return new Promise(resolve => {
                let tweenConfig = (typeof props.tweenConfig === "function") ? props.tweenConfig() : props.tweenConfig
                let config = Object.assign({}, { ...tweenConfig });

                scene.add.tween({
                    onComplete: () => {
                        if(props.waitForCompletion)
                            resolve(NodeState.SUCCEEDED);
                    },  ...config});

                if(props.waitForCompletion === false) {
                    resolve(NodeState.SUCCEEDED);
                }
            });

        }, props)

    }

    function ActionPlaySound(props: ActionPlaySoundParams){
        return wrapActionNode('ActionPlaySound', (node: any) => {
            return new Promise(resolve => {

                let snd: Phaser.Sound.BaseSound = scene.sound.get(props.sndKey) || scene.sound.add(props.sndKey, props.sndConf);

                if(props.waitTilDone) {
                    snd.once(Phaser.Sound.Events.COMPLETE, (sound) => {
                        resolve(NodeState.SUCCEEDED);
                    });
                }
                else {
                    resolve(NodeState.SUCCEEDED);
                }

                const handlePlay = snd => (snd.isPaused) ? snd.resume() : snd.play(props.sndConf)

                handlePlay(snd);
            });

        }, props)
    }


    function ActionDisableControls(props){
        return wrapActionNode('ActionDisableControls', (node: any) => {
            hero.animStateMachine?.setState('idle');
            scene.controls.stop();

            return true;
        }, props)
    }

    function ActionEnableControls(props) {
        return wrapActionNode('ActionDisableControls', (node: any) => {
            scene.controls.start();
            return true;
        }, props)
    }

    function ActionChrisSpeak(props: {text: string }) {
        return wrapActionNode('ActionChrisSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            scene.dialogBox.avatarImg.setTexture('avatars', 1);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function ActionPeterSpeak(props: {text: string }) {
        return wrapActionNode('ActionPeterSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            scene.dialogBox.avatarImg.setTexture('avatars', 3);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function ActionPeterStupidSpeak(props: {text: string }) {
        return wrapActionNode('ActionPeterStupidSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            scene.dialogBox.avatarImg.setTexture('avatars', 2);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function ActionCloseDialog(props) {
        return wrapActionNode('ActionCloseDialog', (node: any) => {
            scene.dialogBox.setVisible(false);
            return true;
        }, props)
    }

    function ActionConnorSpeak(props: {text: string }) {
        return wrapActionNode('ActionConnorSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            scene.dialogBox.avatarImg.setTexture('avatars', 0);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function IntroSequence(props) {
        return (
            <Sequence {...props}>
                <ActionDisableControls />
                <ActionTween waitForCompletion={true} tweenConfig={() => ({
                    targets: [hero],
                    x: 64,
                    duration: 1000
                })} />
                <FunctionCall fn={() => {
                    let body = hero.body as Phaser.Physics.Arcade.Body;
                    body.setCollideWorldBounds(true);
                }} />
                <ActionPeterSpeak text={`Let's GO!!!!!!!!!!!`}  />
                {/*<Wait duration={1500} />*/}
                {/*<ActionChrisSpeak text={`Let's GO!!!!!!!!!!!`}  />*/}
                {/*<Wait duration={1500} />*/}
                {/*<ActionConnorSpeak text={`Let's GO!!!!!!!!!!!`}  />*/}
                <Wait duration={3000} step={() => { Phaser.Actions.IncX([scene.bikes], 2) }} />
                <ActionCloseDialog />
                <ActionEnableControls exit={(bb) => {
                    bb.introDone = true;
                    game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.RANDOM_0);
                }} />
            </Sequence>
        )
    }

    return (
        <Root {...props}>
            <Selector>
                <IntroSequence until={(bb) => Boolean(bb.introDone) }/>
                <Selector>
                    <HandleInstDeathSequence/>
                    <HandleDeathSequence/>
                    <HandleMilestoneCutsceneSequence />
                    <HandleGameCompleteSequence />
                    <HandleGameLoopSequence/>

                </Selector>

            </Selector>
        </Root>
    )
}
