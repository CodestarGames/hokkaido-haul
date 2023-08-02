
// You can write more code here

/* START OF COMPILED CODE */

import EnemyBase from "../../common/Actors/Enemy/EnemyBase";

/* START-USER-IMPORTS */
import Actor from "../../common/Actors/Actor";
import {Hit} from "../../common/Combat";
import List = Phaser.Structs.List;
import {Action} from "../../common/Actions/Action";
import baseStageScene from "../../common/BaseStageScene";
import {EnemyAnimStateMachine} from "../../common/Actors/Enemy/EnemyAnimStateMachine";
import {MoveHorizontalAction} from "../../common/Actions/MoveHorizontalAction";
import {choose} from "../../common/utils";
/* END-USER-IMPORTS */

export default class enemyPrefabCar extends EnemyBase {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "car1", frame ?? 0);

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

	// Write your code here.
	boppable = true;
	damagable = false;

	registerEnemyGroup() {
		super.registerEnemyGroup();
		this.initCollision();
	}


	awake() {

		this.invulnerable = true;

		this.scene.time.delayedCall(2000, () => {  this.invulnerable = false})

		this.animStateMachine = EnemyAnimStateMachine({name: 'enemy', context: this});
		this.animStateMachine.setState('idle');
		this.play(`anim-car-${choose([1,2])}`, true);

	}

	onGetAction(): Action {
		this.animStateMachine?.update();
		let movementModifier = this.getTopLeft().x < 480 ? 1 : 0;
		return new MoveHorizontalAction(Phaser.LEFT, this.game.gameManager.gameSpeed + movementModifier)
	}


	private initCollision() {

		let body = this.body as Phaser.Physics.Arcade.Body;
		body.setAllowGravity(false);
		body.pushable = false;
	}

	onCreateMeleeHits(defender: Actor): List<Hit> {
		return undefined;
	}


	onDied() {
		super.onDied();
		this.flipY = true;

	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
