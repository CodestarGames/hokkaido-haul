
// You can write more code here

/* START OF COMPILED CODE */

import EnemyBase from "../../common/Actors/Enemy/EnemyBase";
/* START-USER-IMPORTS */
import {StateMachine} from "../../common/StateMachine";
import baseStageScene from "../../common/BaseStageScene";
import {EnemyAnimStateMachine} from "../../common/Actors/Enemy/EnemyAnimStateMachine";
import {Action} from "../../common/Actions/Action";
import Actor from "../../common/Actors/Actor";
import {Hit} from "../../common/Combat";
import List = Phaser.Structs.List;
import {MoveHorizontalAction} from "../../common/Actions/MoveHorizontalAction";
import {choose} from "../../common/utils";
/* END-USER-IMPORTS */

export default class enemyDrone extends EnemyBase {



	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "drone", frame ?? 0);

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

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	losRay: any;
	animStateMachine: StateMachine;
	damagable = false;

	// Write your code here.
	boppable = false;
	private isItem: boolean = false;
	registerEnemyGroup() {

		let scene = this.scene as baseStageScene;
		if(scene.gameManager.energy < 5 && scene.itemCooldown === 0) {
			this.isItem = Phaser.Math.RND.weightedPick([false, true])
			if(this.isItem) {
				scene.itemCooldown = 1000;
				this.scene.time.delayedCall(300, () => {
					scene.itemCooldown = 0;
				});
			}
		}
		if(this.isItem) {
			(this.scene as baseStageScene).itemGroup.add(this);
			if(scene.stageLevelName === 'hokkaido') {
				this.setTexture('rootbeer');
			}
			if(scene.stageLevelName === 'akiba') {
				this.setTexture('cimmaroll');
			}
			this.initCollision();
			return;
		}
		if(scene.stageLevelName === 'hokkaido') {
			this.setTexture('drone');
			this.play('anim-drone-idle', true)
		}

		if(scene.stageLevelName === 'akiba') {
			this.setTexture('crowey');
			this.play('anim-crowey-idle', true)
		}
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
		return new MoveHorizontalAction(Phaser.LEFT, this.game.gameManager.gameSpeed)
	}


	private initCollision() {

		let body = this.body as Phaser.Physics.Arcade.Body;
		// body.setSize(48, 48);
		// body.setOffset(0, 16);
		body.setAllowGravity(false);
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
