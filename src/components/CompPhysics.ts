
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */

import baseStageScene from "../common/BaseStageScene";
/* END-USER-IMPORTS */

export default class CompPhysics {

	constructor(gameObject: any) {
		this.gameObject = gameObject;
		(gameObject as any)["__CompPhysics"] = this;

		/* START-USER-CTR-CODE */

		this.gameObject.scene.events.once(Phaser.Scenes.Events.ADDED_TO_SCENE, this.start, this)

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: any): CompPhysics {
		return (gameObject as any)["__CompPhysics"];
	}

	private gameObject: any;
	public isStatic: boolean = false;
	public bodyWidth: number = -1;
	public bodyHeight: number = -1;
	public bodyOffsetX: number = -1;
	public bodyOffsetY: number = -1;
	public allowGravity: boolean = false;

	/* START-USER-CODE */

	// Write your code here.
	start() {
		let scene = this.gameObject.scene as baseStageScene;

		scene.physics.add.existing(this.gameObject, this.isStatic);

		let body = this.gameObject.body as Phaser.Physics.Arcade.Body;
		let bodyWidth = this.bodyWidth === -1 && null;
		let bodyHeight = this.bodyHeight === -1 && null;
		body.setSize(bodyWidth ?? body.height, bodyHeight ?? body.height);
		let bodyOffsetY = this.bodyOffsetY === -1 && null
		let bodyOffsetX = this.bodyOffsetX === -1 && null
		body.setOffset(bodyOffsetX ?? body.offset.x, bodyOffsetY ?? body.offset.y);
		body.updateBounds();

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
