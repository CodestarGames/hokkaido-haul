import Phaser from "phaser";
import {GameRouter} from "./common/GameRouter";
import PlayScene from "./PlayScene";
import TitleScene from "./scenes/TitleScene";
import StartScene from "./scenes/StartScene";
import {DefaultHeroType, IronmouseHeroType} from "./common/Actors/Hero/DefaultHeroType";
import GameOverScene from "./scenes/GameOverScene";
import GameCompleteScene from "./scenes/GameCompleteScene";

export class Boot extends Phaser.Scene {

    preload() {
        // this.load.scenePlugin(
        //     'PhaserDebugDrawPlugin',
        //     'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-draw@7.0.0',
        //     'debugDraw',
        //     'debugDraw'
        // );

        this.load.pack("asset-pack", "assets/asset-pack.json");
        this.load.animation("player-anims", "assets/sprites/player/player-animations.json");
        this.load.json('player-anims', "assets/sprites/player/player-animations.json");
    }

    create() {
        // let { checkpoint, stage, hero } = handleTopbarGameSlug();
        // if(stage) {
        //     let GM = GameManagerSingleton.getInstance(this.game as GameExtended);
        //     GM.setCurrentCheckpointIndex(checkpoint);
        //     this.scene.start(GameRouter[stage].key, {
        //         heroType: getHeroInstByIndex(hero),
        //         stageKey: stage
        //     });
        //     return;
        // }

        this.input.mouse.disableContextMenu();
        this.scene.add("TitleScene", new TitleScene(), false);
        this.scene.add("StartScene", new StartScene(), false);
        this.scene.add("GameOverScene", GameOverScene, false);
        this.scene.add("PlayScene", new PlayScene(), false);
        this.scene.add("GameCompleteScene", new GameCompleteScene(), false);

        this.scene.start(GameRouter.ControllerScene.key, {
            levelSceneKey: GameRouter.StartScene.key,
            config: {
                heroType: new IronmouseHeroType(),
                stageKey: "StartScene"
            }
        });

    }
}
