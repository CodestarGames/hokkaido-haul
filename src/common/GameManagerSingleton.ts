import Phaser from 'phaser';
import SceneExtended from "./SceneExtended";
import HeroSave from "~/common/Actors/Hero/HeroSave";

import {GameExtended} from "../gameExtended";
import {GameRouter} from "./GameRouter";

export enum GAME_SCENE_STATE {
    GAME_SCROLL_STOPPED,
    GAME_SCROLL,
    NONE
}

export enum TEMPLATE_GEN_TYPE {
    LOOPING_FLAT,
    RANDOM_0,
    TUNNEL
}


export default class GameManagerSingleton {
    currentGameState: GAME_SCENE_STATE;
    templateGenType: TEMPLATE_GEN_TYPE;
    milestones: Set<number>;
    get energy(): number {
        return this._energy;
    }

    set energy(value: number) {
        this._energy = value;
    }
    private _energy: number;

    get distance(): number {
        return this._distance;
    }

    set distance(value: number) {
        this._distance = value;
    }
    private _distance: number;
    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }
    gameSpeed: number;
    private _score: number;

    get currentMusicKey(): string {
        return this._currentMusicKey;
    }

    set currentMusicKey(value: string) {
        this._currentMusicKey = value;
    }
    game: Phaser.Game;
    heroSave: HeroSave;

    private _currentMusicKey: string;

    private static instance: GameManagerSingleton;

    private constructor(game: GameExtended) {
        this.game = game;
        this.gameSpeed = 1;
        this.heroSave = new HeroSave();
        this.currentGameState = GAME_SCENE_STATE.GAME_SCROLL;
        this.score = 0;
        this.distance = 0;
        this.energy = 0;
        this.milestones = new Set<number>();

        this.templateGenType = TEMPLATE_GEN_TYPE.LOOPING_FLAT;
    }

    public static getInstance(game?: GameExtended): GameManagerSingleton {
        if (!GameManagerSingleton.instance) {
            GameManagerSingleton.instance = new GameManagerSingleton(game);
        }

        return GameManagerSingleton.instance;
    }

    get currentStage() {
        return this.heroSave.currentStage;
    }

    set currentStage(stageName){
        //this.clearCheckpoint();
        this.heroSave.currentStage = stageName;
    }

    static updateHud(game){
        if(game.gameManager) {
            let scene = game.gameManager.getCurrentScene();
            scene.hUDPanelPrefabInst.speedBlocks[0].visible = (game.gameManager.gameSpeed >= 1);
            scene.hUDPanelPrefabInst.speedBlocks[1].visible = (game.gameManager.gameSpeed >= 2.5);
            scene.hUDPanelPrefabInst.speedBlocks[2].visible = (game.gameManager.gameSpeed >= 3);
            scene.hUDPanelPrefabInst.speedBlocks[3].visible = (game.gameManager.gameSpeed >= 4.5);
            scene.hUDPanelPrefabInst.speedBlocks[4].visible = (game.gameManager.gameSpeed >= 5);

            scene.hUDPanelPrefabInst.energyBlocks[0].visible = (game.gameManager.energy >= 1);
            scene.hUDPanelPrefabInst.energyBlocks[1].visible = (game.gameManager.energy >= 2);
            scene.hUDPanelPrefabInst.energyBlocks[2].visible = (game.gameManager.energy >= 3);
            scene.hUDPanelPrefabInst.energyBlocks[3].visible = (game.gameManager.energy >= 4);
            scene.hUDPanelPrefabInst.energyBlocks[4].visible = (game.gameManager.energy >= 5);
        }
    }

    reset(){
        this.heroSave = new HeroSave();
        this.gameSpeed = 1;
        this.score = 0;
        this.distance = 0;
        this.energy = 0;
        this.milestones = new Set<number>();
        this.currentGameState = GAME_SCENE_STATE.GAME_SCROLL;
        this.templateGenType = TEMPLATE_GEN_TYPE.LOOPING_FLAT;
        // this.milestones.add(100)
        // this.milestones.add(200)
        // this.milestones.add(300)
        // this.milestones.add(400)
        // this.milestones.add(500)
        // this.milestones.add(600)
        // this.milestones.add(700)
    }

    stopGameScroll() {
        this.currentGameState = GAME_SCENE_STATE.GAME_SCROLL_STOPPED;
    }

    startGameScroll() {
        this.currentGameState = GAME_SCENE_STATE.GAME_SCROLL;
    }

    restartFromCheckpoint(){

    }

    getSceneFromSlug(currentStage: string) : SceneExtended {
        return <SceneExtended>this.game.scene.getScene(GameRouter[currentStage].key)
    }

    getCurrentScene(): SceneExtended {
        return this.getSceneFromSlug(this.currentStage);
    }

    setTemplateGenType(type: TEMPLATE_GEN_TYPE) {
        this.templateGenType = type;
    }
}
