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
import {IronmouseHeroType} from "../Actors/Hero/DefaultHeroType";


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
        scene.hUDPanelPrefabInst.kMText.text = "Distance:" + game.gameManager.distance.toFixed(1) + `km/${scene.dist}`;
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
                <ActionDisableControls />
                <FunctionCall fn={() => { game.gameManager.stopGameScroll(); }}/>
                <ActionPlaySound sndKey={'death-fall'} waitTilDone={true} sndConf={{ volume: 0.2 }} />
                <FunctionCall fn={() => { hero.animStateMachine.setState('died'); }}/>
            </Sequence>
        )
    }

    function HandleMilestoneCutsceneSequence(props) {
        return (
            <Selector {...props} >
                <HandleCutSceneSetup
                    cond={
                        () => game.gameManager.distance > 1
                        && Math.floor(game.gameManager.distance) % 50 === 0
                        && Math.ceil(game.gameManager.distance) < 280
                    }
                />
            </Selector>

        )
    }


    function HandleCheerFromEnergy(props) {
        return (
            <Sequence {...props}>
                <Selector>
                    <Selector cond={() => scene.stageLevelName === 'hokkaido' } exit={() => { game.gameManager.energy = 0; }}>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 0)}>
                            <ActionPlayerSpeak text={`Speech time!`} />
                            <ActionPlayerStupidSpeak text={`You guys suck!`} />
                            <Lotto>
                                <ActionConnorSpeak text={`Worst speech ever.`} />
                                <ActionConnorSpeak text={`Viewer numbers are dropping. Is this a PremierTwo stream?`} />
                                <ActionConnorSpeak text={`Nobody is going to donate at this rate.`} />
                                <ActionConnorSpeak text={`Excuse me while I drive myself into a ditch.`} />
                            </Lotto>
                            <Lotto>
                                <ActionChrisSpeak text={`Never thought I'd be agreeing with Connor.`} />
                                <ActionChrisSpeak text={`What is this? A youtube comments section?`} />
                                <ActionChrisSpeak text={`You try biking behind the worlds slowest Welshman!`} />
                            </Lotto>
                            <FunctionCall fn={() => {  spawnText("-$10,000"); game.gameManager.score -= 10000 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 1)}>
                            <ActionPlayerSpeak text={`Speech time!`} />
                            <ActionPlayerStupidSpeak text={`Are you guys even trying?`} />
                            <Lotto>
                                <ActionConnorSpeak text={`I've heard worse from my Twitch chat.`} />
                                <ActionConnorSpeak text={`How about we switch vehicles and you try this?`} />
                                <ActionConnorSpeak text={`I'm trying not to throw this camera at you.`} />
                            </Lotto>
                            <Lotto>
                                <ActionChrisSpeak text={`How about you bike and I relax in the vehicle?`} />
                                <ActionChrisSpeak text={`How about you be useful and try to find the nearest combini?`} />
                                <ActionChrisSpeak text={`*pant* *pant* *wheeeeeze*`} />
                            </Lotto>
                            <FunctionCall fn={() => {  spawnText("-$1,000"); game.gameManager.score -= 1000 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 2)}>
                            <ActionPlayerSpeak text={`Speech time!`} />
                            <ActionPlayerStupidSpeak text={`Go team!`} />
                            <ActionConnorSpeak text={`That was mid.`} />
                            <ActionChrisSpeak text={`Have you considered acting classes?`} />
                            <FunctionCall fn={() => {  spawnText("+$10"); game.gameManager.score += 10 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 3)}>
                            <ActionPlayerSpeak text={`Speech time!`} />
                            <ActionPlayerSpeak text={`You guys rock!`} />
                            <ActionConnorSpeak text={`Cheers.`} />
                            <ActionChrisSpeak text={`I'd rather be reading my book.`} />
                            <FunctionCall fn={() => {  spawnText("+$100"); game.gameManager.score += 100 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 4)}>
                            <ActionPlayerSpeak text={`Speech time!`} />
                            <ActionPlayerSpeak text={`YOU GUYS ARE CRUSHING IT!`} />
                            <ActionConnorSpeak text={`Let's GO!`} />
                            <ActionChrisSpeak text={`I can see the combini in the distance!`} />
                            <FunctionCall fn={() => {  spawnText("+$1,000"); game.gameManager.score += 1000 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 5)}>
                            <ActionPlayerSpeak text={`Speech time!`} />
                            <Lotto>
                                <Sequence>
                                    <ActionPlayerSpeak text={`It's almost dinner time!!`} />
                                    <ActionConnorSpeak text={`Oh GOD, YES!!!!`} />
                                    <ActionChrisSpeak text={`Better be fried chicken...`} />
                                </Sequence>
                                <Sequence>
                                    <ActionPlayerSpeak text={`Legend has it there is a smoking hot onsen at the end of this cycle...`} />
                                    <ActionConnorSpeak text={`Let's GO!!!!`} />
                                    <ActionChrisSpeak text={`Connor wait up!`} />
                                </Sequence>
                            </Lotto>
                            <FunctionCall fn={() => { spawnText("+$10,000"); game.gameManager.score += 10000 }} />
                        </Sequence>
                    </Selector>
                    <Selector cond={() => scene.stageLevelName === 'akiba' } exit={() => { game.gameManager.energy = 0; }}>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 0)}>
                            <ActionPlayerStupidSpeak text={`We didn't get any cimmarolls!`} />
                            <Lotto>
                                <ActionOppositeStupidSpeak text={`Chat's not gonna be happy about that...`} />
                                <ActionOppositeStupidSpeak text={`Time to knock some heads!!`} />
                                <ActionOppositeStupidSpeak text={`Viewer numbers are plummeting! Is this a PremierTwo stream?`} />
                                <ActionOppositeStupidSpeak text={`I'm gonna bop crowey the anime bird right in his beak!!`} />
                                <ActionOppositeStupidSpeak text={`I'm about to take out the trash!`} />
                                <ActionOppositeStupidSpeak text={`I'm gonna bop Donkey Connor on his fat head!`} />
                            </Lotto>
                            <FunctionCall fn={() => {  spawnText("-$10,000"); game.gameManager.score -= 10000 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 1)}>
                            <ActionPlayerStupidSpeak text={`We got one cimmaroll!`} />
                            <Lotto>
                                <ActionOppositeStupidSpeak text={`We need more than that! Viewer numbers are plummeting!`} />
                                <ActionOppositeStupidSpeak text={`Time to bring out the big guns!`} />
                                <ActionOppositeStupidSpeak text={`Let's get more from those trashy twerps!`} />
                            </Lotto>
                            <FunctionCall fn={() => {  spawnText("-$1,000"); game.gameManager.score -= 1000 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 2)}>
                            <ActionPlayerStupidSpeak text={`We got two cimmarolls!`} />
                            <Lotto>
                                <ActionOppositeStupidSpeak text={`Show those trashy losers we mean business!`} />
                                <ActionOppositeStupidSpeak text={`All the world's cimmarolls belong to MOUSE!`} />
                                <ActionOppositeStupidSpeak text={`That monke is about meet his maker!`} />
                            </Lotto>
                            <FunctionCall fn={() => {  spawnText("+$10"); game.gameManager.score += 10 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 3)}>
                            <ActionPlayerStupidSpeak text={`We got three cimmarolls!`} />
                            <Lotto>
                                <ActionOppositeSpeak text={`Viewer numbers are rising! Let's go!!`} />
                                <ActionOppositeSpeak text={`We can do this!!`} />
                            </Lotto>
                            <FunctionCall fn={() => {  spawnText("+$100"); game.gameManager.score += 100 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 4)}>
                            <ActionPlayerSpeak text={`We got four cimmarolls!!`} />
                            <Lotto>
                                <ActionOppositeSpeak text={`Yeah!! Chat is going nuts!!!`} />
                                <ActionOppositeSpeak text={`POGGERS!!!`} />
                            </Lotto>
                            <FunctionCall fn={() => {  spawnText("+$1,000"); game.gameManager.score += 1000 }} />
                        </Sequence>
                        <Sequence cond={() => Boolean(game.gameManager.energy === 5)}>
                            <ActionPlayerSpeak text={`We got five cimmarolls!!`} />
                            <Lotto>
                                <ActionOppositeSpeak text={`WAHOO!! Donations are pouring in left and right!`} />
                                <ActionOppositeSpeak text={`WAHOO!! Plasma for everyone!!!`} />
                            </Lotto>
                            <FunctionCall fn={() => { spawnText("+$10,000"); game.gameManager.score += 10000 }} />
                        </Sequence>
                    </Selector>
                </Selector>

                <ActionCloseDialog />
                <ActionTween waitForCompletion={true} tweenConfig={() => ({
                    targets: scene.bikes,
                    x: "+=360",
                    duration: 1500
                })} />

            </Sequence>
        );
    }

    function resetSceneTemplatesToLoop() {

        scene.enemyCollisionGroup.getChildren().forEach((obstacle: any) => {
            scene.enemyCollisionGroup.killAndHide(obstacle);
            obstacle.destroy();
        })
        scene.itemGroup.getChildren().forEach((item: any) => {
            scene.itemGroup.killAndHide(item);
            item.destroy();
        })
        scene.staticPhysicsItemsGroup.getChildren().forEach((obstacle: any) => {
            scene.staticPhysicsItemsGroup.killAndHide(obstacle);
            obstacle.destroy();
        })
        scene.enemyCollisionGroup.clear(true, true);
        scene.itemGroup.clear(true, true);
        scene.staticPhysicsItemsGroup.clear(true, true);
        scene.templateBoundsGroup.clear(true, true);
        scene.pillarsGroup.clear(true, true);


        let levelTemplateInst = new LevelTemplateFlatLoopPrefab(scene, 240, 0);
        scene.level_layer.add(levelTemplateInst);
        levelTemplateInst.parentLayer = scene.level_layer;
        levelTemplateInst.awake();
    }


    function HandleAfterBurnerSequence(props) {
        return (
            <Sequence {...props} entry={() => { hero.jumpStep = 0; } } >
                <ActionDisableControls />
                <Sequence step={() => { scene.warpTileSprite.tilePositionX += 32; }}>
                    <FunctionCall fn={() => {
                        scene.sound.play('sfxAfterBurner', {volume: 0.2});
                        hero.angle = 0;
                        scene.speed_effect_layer.visible = true;
                        //getHeroBody().setAllowGravity(false);
                        scene.physics.world.disableBody(getHeroBody());
                        resetSceneTemplatesToLoop()
                    }}/>
                    <FunctionCall fn={() => { game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.LOOPING_FLAT) }}/>
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: [hero],
                        x: 96,
                        y: 376,
                        duration: 1000
                    })} />
                    <Wait duration={3000} />
                </Sequence>
                <FunctionCall fn={() => {
                    scene.speed_effect_layer.visible = false;
                    scene.physics.world.enableBody(hero);
                    //getHeroBody().setAllowGravity(true);
                }}/>
            </Sequence>
        )
    }


    function HandleCutSceneSetup(props) {
        return (
            <Sequence {...props}>
                <FunctionCall fn={() => {game.gameManager.distance += 1} }/>
                <HandleAfterBurnerSequence />
                <Parallel>
                    <ActionPlayerSpeak text={(hero.heroType instanceof IronmouseHeroType || scene.stageLevelName === 'hokkaido')  ? 'Hey guys!' : 'Hey mouse!'} />
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: scene.bikes,
                        x: "-=360",
                        duration: 2000
                    })} />
                </Parallel>


                {/* do level specific cutscenes here */}
                <HandleCheerFromEnergy />
                <ActionEnableControls exit={() => { game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.RANDOM_0); }}/>
            </Sequence>
        );
    }

    function HandleGameCompletedSequence(props) {
        return (
            <Sequence {...props} cond={() => game.gameManager.distance >= (scene.dist - 0.1) }>
                <ActionDisableControls />
                <Sequence step={() => { scene.warpTileSprite.tilePositionX += 32; }}>
                    <FunctionCall fn={() => {
                        scene.sound.play('sfxAfterBurner', {volume: 0.2});
                        hero.angle = 0;
                        scene.speed_effect_layer.visible = true;
                        //getHeroBody().setAllowGravity(false);
                        scene.physics.world.disableBody(getHeroBody());
                        resetSceneTemplatesToLoop()
                    }}/>
                    <FunctionCall fn={() => { game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.LOOPING_FLAT) }}/>
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: [hero],
                        x: 96,
                        y: 376,
                        duration: 1000
                    })} />
                    <Wait duration={3000} />
                </Sequence>
                <FunctionCall fn={() => {
                    scene.speed_effect_layer.visible = false;
                    scene.physics.world.enableBody(hero);
                    //getHeroBody().setAllowGravity(true);
                }}/>
                <Parallel>
                    <ActionPlayerSpeak text={`We did it! Good job everyone!`} />
                    <ActionTween waitForCompletion={true} tweenConfig={() => ({
                        targets: scene.bikes,
                        x: "-=360",
                        duration: 2000
                    })} />
                </Parallel>
                <Wait duration={6000} />
                <FunctionCall fn={() => {
                    scene.controls.start();
                    fadeBetweenScenes(game, GameRouter.PlayScene.key, GameRouter.GameCompleteScene.key, true, { heroType: hero.heroType });
                    scene.BTreeManager.removeTree(scene.BTree);
                }}/>
            </Sequence>
        )
    }


    // function HandleMouseIntroSequence(props) {
    //     return (
    //         <Sequence {...props} cond={() => game.gameManager.distance >= 99.9 }>
    //             <ActionDisableControls />
    //             <Sequence step={() => { scene.warpTileSprite.tilePositionX += 32; }}>
    //                 <FunctionCall fn={() => {
    //                     scene.sound.play('sfxAfterBurner', {volume: 0.2});
    //                     hero.angle = 0;
    //                     scene.speed_effect_layer.visible = true;
    //                     //getHeroBody().setAllowGravity(false);
    //                     scene.physics.world.disableBody(getHeroBody());
    //                     resetSceneTemplatesToLoop()
    //                 }}/>
    //                 <FunctionCall fn={() => { game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.LOOPING_FLAT) }}/>
    //                 <ActionTween waitForCompletion={true} tweenConfig={() => ({
    //                     targets: [hero],
    //                     x: 96,
    //                     y: 376,
    //                     duration: 1000
    //                 })} />
    //                 <Wait duration={3000} />
    //             </Sequence>
    //             <FunctionCall fn={() => {
    //                 scene.speed_effect_layer.visible = false;
    //                 scene.physics.world.enableBody(hero);
    //                 //getHeroBody().setAllowGravity(true);
    //             }}/>
    //             <Parallel>
    //                 <ActionPlayerSpeak text={`We're almost there boys!`} />
    //                 <ActionTween waitForCompletion={true} tweenConfig={() => ({
    //                     targets: scene.bikes,
    //                     x: "-=360",
    //                     duration: 2000
    //                 })} />
    //             </Parallel>
    //
    //             <ActionChrisSpeak text={`ACK! My back!`}/>
    //             <ActionTween waitForCompletion={true} tweenConfig={() => ({
    //                 targets: scene.bikesChris,
    //                 x: "-=480",
    //                 duration: 2000
    //             })} />
    //             <ActionConnorSpeak text={`Hey! Get back here! We have to finish this together!`} />
    //             <ActionQuestionSpeak text={`THERE YOU ARE!`} />
    //             <Wait duration={3000} />
    //             <ActionMouseSpeak text={`I've been looking everywhere for you Monke! We've got a stream to do!`}/>
    //             <ActionConnorSpeak text={`I'm kinda of busy mouse, can't it wait?`} />
    //             <ActionMouseSpeak text={`No! We're already late! Now come on! We've got no time to argue!`}/>
    //             <Wait duration={3000} />
    //             <ActionPlayerSpeak text={`Hey! We need him to finish the Cycle!`} />
    //             <ActionMouseKekSpeak text={'Can it premier dork!'}/>
    //             <Wait duration={3000} />
    //             <ActionMouseSpeak text={`Ahahahahaha!`}/>
    //             <ActionCloseDialog />
    //             <ActionEnableControls exit={() => {
    //                 game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.RANDOM_0);
    //             }}/>
    //         </Sequence>
    //     )
    // }

    function HandleDeathSequence(props) {
        return (
            <Sequence {...props} cond={() => hero.animStateMachine.isCurrentState('died')}>
                <FunctionCall fn={() => {
                    scene.controls.start();
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
            if(hero.animStateMachine?.currentState.name.indexOf('pete') > -1)
                hero.animStateMachine?.setState('pete-idle');
            else
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

    function ActionPlayerSpeak(props: {text: string }) {
        return wrapActionNode('ActionPlayerSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);

            let avatarIndex = hero.heroType instanceof IronmouseHeroType ? 5 : 3;
            scene.dialogBox.avatarImg.setTexture('avatars', avatarIndex);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function ActionOppositeSpeak(props: {text: string }) {
        return wrapActionNode('ActionOppositeSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);

            let avatarIndex = hero.heroType instanceof IronmouseHeroType ? 3 : 5;
            scene.dialogBox.avatarImg.setTexture('avatars', avatarIndex);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function ActionOppositeStupidSpeak(props: {text: string }) {
        return wrapActionNode('ActionOppositeStupidSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);

            let avatarIndex = hero.heroType instanceof IronmouseHeroType ? 2 : 4;
            scene.dialogBox.avatarImg.setTexture('avatars', avatarIndex);
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

    function ActionPlayerStupidSpeak(props: {text: string }) {
        return wrapActionNode('ActionPlayerStupidSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            let avatarIndex = hero.heroType instanceof IronmouseHeroType ? 4 : 2;
            scene.dialogBox.avatarImg.setTexture('avatars', avatarIndex);
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

    function ActionQuestionSpeak(props: {text: string }) {
        return wrapActionNode('ActionQuestionSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            scene.dialogBox.avatarImg.setTexture('avatars', 6);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function ActionMouseSpeak(props: {text: string }) {
        return wrapActionNode('ActionMouseSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            scene.dialogBox.avatarImg.setTexture('avatars', 5);
            await scene.dialogBox.typewriteBitmapText(props.text);
            return NodeState.SUCCEEDED;
        }, props)
    }

    function ActionMouseKekSpeak(props: {text: string }) {
        return wrapActionNode('ActionMouseKekSpeak', async (node: any) => {
            if(!scene.dialogBox.visible)
                scene.dialogBox.setVisible(true);
            scene.dialogBox.avatarImg.setTexture('avatars', 4);
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
                    body.setAllowGravity(true);
                }} />
                <ActionPlayerSpeak text={`Let's GO!!!!!!!!!!!`}  />
                {/*<Wait duration={1500} />*/}
                {/*<ActionChrisSpeak text={`Let's GO!!!!!!!!!!!`}  />*/}
                {/*<Wait duration={1500} />*/}
                {/*<ActionConnorSpeak text={`Let's GO!!!!!!!!!!!`}  />*/}
                <Wait duration={3000} step={() => { Phaser.Actions.IncX(scene.bikes, 2) }} />
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
                    {/*<HandleMouseIntroSequence />*/}
                    <HandleGameCompletedSequence/>
                    <HandleGameLoopSequence/>
                </Selector>
            </Selector>
        </Root>
    )
}
