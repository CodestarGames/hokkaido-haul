
// You can write more code here

/* START OF COMPILED CODE */

import EnemyBase from "../../common/Actors/Enemy/EnemyBase";
/* START-USER-IMPORTS */
import {Action} from "../../common/Actions/Action";
import {EnemyAnimStateMachine} from "../../common/Actors/Enemy/EnemyAnimStateMachine";
import {StateMachine} from "../../common/StateMachine";
import baseStageScene from "../../common/BaseStageScene";
import Actor from "../../common/Actors/Actor";
import {Hit} from "../../common/Combat";
import List = Phaser.Structs.List;
/* END-USER-IMPORTS */

export default class enemyPrefab extends EnemyBase {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "bear", frame);

		this.setOrigin(0.5, 1);
		this.tintTopLeft = 16777215;
		this.tintTopRight = 16777215;
		this.tintBottomLeft = 16777215;
		this.tintBottomRight = 16777215;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once("update", () => this.awake());
		this.hitStun = false;
		this.launchable = true;

		this.setInteractive();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	losRay: any;
	animStateMachine: StateMachine;
	boppable = true;

	// Write your code here.

	registerEnemyGroup() {
		super.registerEnemyGroup();
		this.initCollision();
	}

	awake() {
		let scene = this.scene as baseStageScene;
		this.invulnerable = true;

		this.scene.time.delayedCall(2000, () => {  this.invulnerable = false})


		this.animStateMachine = EnemyAnimStateMachine({name: 'enemy', context: this});
		this.animStateMachine.setState('idle');

	}

	onGetAction(): Action {
		this.animStateMachine?.update();
		return undefined;
	}


	private initCollision() {

		let body = this.body as Phaser.Physics.Arcade.Body;
		// body.setSize(48, 48);
		// body.setOffset(0, 16);

		body.pushable = false;
	}

	onCreateMeleeHits(defender: Actor): List<Hit> {
		return undefined;
	}

	takeDamage(action: Action, damage: number, attacker: Actor): boolean {
		if(!this.active)
			return false;

		if(this.hitStun === true)
			return true;

		this.hitStun = true;
		this.lastHitTime = Date.now();

		this.animStateMachine.setState('hurt');

		return super.takeDamage(action, damage, attacker);
	}

	onDied() {
		super.onDied();
		this.flipY = true;

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here