import Actor from "../Actor";
import {StateMachine} from "../../StateMachine";
import baseStageScene from "../../BaseStageScene";

export default abstract class EnemyBase extends Actor {
    wasSpawned: boolean;
    hitStun: boolean;
    lastHitTime: number;
    animStateMachine: StateMachine;

    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
        super(scene, x, y, texture, frame);
        this.wasSpawned = false;
        this.scrollFactorX = 0;
        this.scrollFactorY = 0;
        this.health = 1;

        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.registerEnemyGroup, this);

    }

    abstract boppable: boolean

    registerEnemyGroup() {
        //this.setActive(false);

        (this.scene as baseStageScene).enemyCollisionGroup.add(this);
        (this.scene as baseStageScene).enemyPoolGroup.add(this);
    }

    kill(){

        this.destroy();
    }

    start(){

    }

    onDied() {
        super.onDied();
        (this.scene as baseStageScene).enemyCollisionGroup.remove(this, false);
    }


    spawnDrop(body) {

    }

}
