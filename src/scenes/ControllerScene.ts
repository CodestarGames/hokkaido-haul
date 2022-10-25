
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import gameBoyWindow from "../prefabs/ui/gameBoyWindow";
/* START-USER-IMPORTS */

import {HeroType} from "../common/Actors/Hero/HeroType";
import Vector2 = Phaser.Math.Vector2;
import PlayScene from "../PlayScene";
import {GameExtended} from "../gameExtended";
import baseStageScene from "../common/BaseStageScene";

/* END-USER-IMPORTS */

export default class ControllerScene extends Phaser.Scene {

	constructor() {
		super("ControllerScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// gameBoyWindowInst
		const gameBoyWindowInst = new gameBoyWindow(this, 0, 0);
		this.add.existing(gameBoyWindowInst);

		this.gameBoyWindowInst = gameBoyWindowInst;

		this.events.emit("scene-awake");
	}

	public gameBoyWindowInst!: gameBoyWindow;

	/* START-USER-CODE */

	// Write your code here
	cursorSprite: Phaser.GameObjects.Sprite;
	gameWindow: any;

	create(props: {levelSceneKey: string, config: {heroType: HeroType}}) {

		this.editorCreate();

		(this.game as GameExtended).gameManager.currentStage = props.levelSceneKey;

		let gameWindow = this.scene.manager.getScene((this.game as GameExtended).gameManager.currentStage);
		this.gameWindow = gameWindow

		let parentZonePos = new Vector2();
		parentZonePos.x = this.gameBoyWindowInst.x + this.gameBoyWindowInst.playAreaZone.x;
		parentZonePos.y = this.gameBoyWindowInst.y + this.gameBoyWindowInst.playAreaZone.y;
		(gameWindow as baseStageScene).setParentZone(parentZonePos, this.gameBoyWindowInst.playAreaZone);

		this.cameras.main.setPosition(0, 0);
		this.scene.launch(props.levelSceneKey, props.config)

	}

	update(time, dt) {

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
