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

export default function EndSceneBtree(props) {

    let bb = props.blackboard;
    let game = bb.game as GameExtended;
    let scene = game.gameManager.getCurrentScene() as PlayScene;
    let hero = scene.hero;
    let getHeroBody = () => scene.hero.body as Phaser.Physics.Arcade.Body;




    let foundBoundForRemoval = null
    game.gameManager.score = 0;
    let incGameScore = () => {
        game.gameManager.score-= (10)// + (10 / game.gameManager.gameSpeed);
        scene.hUDPanelPrefabInst.scoreText.text = "Donations:$" + game.gameManager.score.toFixed(0);
        scene.hUDPanelPrefabInst.kMText.text = "Distance:" + game.gameManager.distance.toFixed(1) + "km/???";
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
                <Wait duration={40} exit={() => { incGameSpeed() }} />
                <Wait duration={400} exit={() => { incGameScore() }} />
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


    function HandleGameCompletedSequence(props) {
        return (
            <Sequence {...props} cond={(bb) => bb.stopScene === true }>
                <FunctionCall fn={() => {
                    scene.controls.start();
                    fadeBetweenScenes(game, GameRouter.EndScene.key, GameRouter.TitleScene.key);
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
                <ActionPlayerSpeak text={`YEE-HAW!!!!!!!`}  />
                <ActionCloseDialog />
                <ActionEnableControls exit={(bb) => {
                    bb.introDone = true;
                    scene.time.delayedCall(229000, () => { bb.stopScene = true; })
                    game.gameManager.setTemplateGenType(TEMPLATE_GEN_TYPE.LOOPING_FLAT);
                }} />
            </Sequence>
        )
    }

    return (
        <Root {...props}>
            <Selector>
                <IntroSequence until={(bb) => Boolean(bb.introDone) }/>
                <Selector>
                    <HandleGameCompletedSequence/>
                    <HandleGameLoopSequence/>
                </Selector>
            </Selector>
        </Root>
    )
}
