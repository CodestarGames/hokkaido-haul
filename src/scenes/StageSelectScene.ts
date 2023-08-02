
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";
/* START-USER-IMPORTS */
import {GameRouter} from "../common/GameRouter";
import {fadeBetweenScenes} from "../common/utils";
import {HeroType} from "../common/Actors/Hero/HeroType";
/* END-USER-IMPORTS */

export default class StageSelectScene extends SceneExtended {

	constructor() {
		super("StageSelectScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// selectRect_2
		const selectRect_2 = this.add.rectangle(124, 314, 120, 64);
		selectRect_2.isFilled = true;
		selectRect_2.fillColor = 5013592;
		selectRect_2.isStroked = true;
		selectRect_2.strokeColor = 3958591;
		selectRect_2.lineWidth = 3;

		// selectRect_1
		const selectRect_1 = this.add.rectangle(377, 178, 120, 64);
		selectRect_1.isFilled = true;
		selectRect_1.fillColor = 5013592;
		selectRect_1.isStroked = true;
		selectRect_1.strokeColor = 3958591;
		selectRect_1.lineWidth = 3;

		// titleText_4
		const titleText_4 = this.add.bitmapText(325, 287, "pixel", "Akiba Adventure\n");
		titleText_4.scaleX = 2;
		titleText_4.scaleY = 2.5;
		titleText_4.setOrigin(0.5, 0.5);
		titleText_4.tintFill = true;
		titleText_4.tintTopLeft = 5013592;
		titleText_4.tintTopRight = 5013592;
		titleText_4.tintBottomLeft = 5013592;
		titleText_4.tintBottomRight = 5013592;
		titleText_4.text = "Akiba Adventure\n";
		titleText_4.fontSize = 8;
		titleText_4.maxWidth = 358;

		// titleText_3
		const titleText_3 = this.add.bitmapText(185, 150, "pixel", "Hokkaido Haul");
		titleText_3.scaleX = 2;
		titleText_3.scaleY = 2.5;
		titleText_3.setOrigin(0.5, 0.5);
		titleText_3.tintFill = true;
		titleText_3.tintTopLeft = 5013592;
		titleText_3.tintTopRight = 5013592;
		titleText_3.tintBottomLeft = 5013592;
		titleText_3.tintBottomRight = 5013592;
		titleText_3.text = "Hokkaido Haul";
		titleText_3.fontSize = 8;
		titleText_3.maxWidth = 358;

		// titleText
		const titleText = this.add.bitmapText(185, 188, "pixel", "A Cyclathon through\nnorthern Japan!");
		titleText.scaleX = 2;
		titleText.scaleY = 2.5;
		titleText.setOrigin(0.5, 0.5);
		titleText.tintFill = true;
		titleText.tintTopLeft = 5013592;
		titleText.tintTopRight = 5013592;
		titleText.tintBottomLeft = 5013592;
		titleText.tintBottomRight = 5013592;
		titleText.text = "A Cyclathon through\nnorthern Japan!";
		titleText.fontSize = 6;
		titleText.maxWidth = 358;

		// titleText_2
		const titleText_2 = this.add.bitmapText(325, 324, "pixel", "Collect Cimma\nRolls for chat!");
		titleText_2.scaleX = 2;
		titleText_2.scaleY = 2.5;
		titleText_2.setOrigin(0.5, 0.5);
		titleText_2.tintFill = true;
		titleText_2.tintTopLeft = 5013592;
		titleText_2.tintTopRight = 5013592;
		titleText_2.tintBottomLeft = 5013592;
		titleText_2.tintBottomRight = 5013592;
		titleText_2.text = "Collect Cimma\nRolls for chat!";
		titleText_2.fontSize = 6;
		titleText_2.maxWidth = 358;

		// titleText_1
		const titleText_1 = this.add.bitmapText(241, 64, "pixel", "Stage Select");
		titleText_1.scaleX = 2;
		titleText_1.scaleY = 2.5;
		titleText_1.setOrigin(0.5, 0.5);
		titleText_1.tintFill = true;
		titleText_1.tintTopLeft = 5013592;
		titleText_1.tintTopRight = 5013592;
		titleText_1.tintBottomLeft = 5013592;
		titleText_1.tintBottomRight = 5013592;
		titleText_1.text = "Stage Select";
		titleText_1.fontSize = 10;
		titleText_1.maxWidth = 358;

		// selectRect
		const selectRect = this.add.rectangle(251, 177, 420, 96);
		selectRect.fillColor = 12314499;
		selectRect.isStroked = true;
		selectRect.strokeColor = 3958591;
		selectRect.lineWidth = 3;

		// image_1
		this.add.image(378, 181, "bear");

		// image
		this.add.image(125, 315, "cimmaroll");

		this.selectRect_2 = selectRect_2;
		this.selectRect_1 = selectRect_1;
		this.titleText_4 = titleText_4;
		this.titleText_3 = titleText_3;
		this.titleText = titleText;
		this.titleText_2 = titleText_2;
		this.titleText_1 = titleText_1;
		this.selectRect = selectRect;

		this.events.emit("scene-awake");
	}

	private selectRect_2!: Phaser.GameObjects.Rectangle;
	private selectRect_1!: Phaser.GameObjects.Rectangle;
	public titleText_4!: Phaser.GameObjects.BitmapText;
	public titleText_3!: Phaser.GameObjects.BitmapText;
	public titleText!: Phaser.GameObjects.BitmapText;
	public titleText_2!: Phaser.GameObjects.BitmapText;
	public titleText_1!: Phaser.GameObjects.BitmapText;
	private selectRect!: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */

	// Write your code here
	heroType: HeroType
	private selectedStageId: number;
	private stages: ({ yPos: number; stageLevelName: string } | { yPos: number; stageLevelName: string } | {
		yPos: number;
		stageLevelName: string
	})[];
	selectTimeout: number = 0;
	create(props) {
		super.create(props);
		this.heroType = props.heroType;
		this.stages = [
			{
				stageLevelName: 'hokkaido',
				yPos: 177
			},
			{
				stageLevelName: 'akiba',
				yPos: 311
			}
		];
		this.selectedStageId = 0
	}


	update(time, dt) {
		super.update(time, dt);

		if (this.controls.up.isPressed && this.selectTimeout === 0) {
			if(this.selectedStageId > 0) {
				this.selectTimeout = 1000;
				this.time.delayedCall(500, () => {
					this.selectTimeout = 0;
				})
				this.selectedStageId--;
				if (this.selectRect.y !== this.stages[this.selectedStageId].yPos)
					this.sound.play('sfxStart', {volume: 0.2});
				this.selectRect.setPosition(239, this.stages[this.selectedStageId].yPos);
			}

		}

		if (this.controls.down.isPressed && this.selectTimeout === 0) {
			if(this.selectedStageId < 2) {
				this.selectTimeout = 1000;
				this.time.delayedCall(500, () => {
					this.selectTimeout = 0;
				})
				this.selectedStageId++;
				if (this.selectRect.y !== this.stages[this.selectedStageId].yPos)
					this.sound.play('sfxStart', {volume: 0.2});
				this.selectRect.setPosition(239, this.stages[this.selectedStageId].yPos);
			}


		}

		if (this.controls.jump.isPressed && this.selectTimeout === 0) {

			if(this.selectedStageId === 2) {
				this.selectTimeout = 1000;
				this.time.delayedCall(500, () => {
					this.selectTimeout = 0;
				})
				this.sound.play('bop', {volume: 0.2});
				return;
			}
			this.controls.stop();

			this.sound.play('sfxStart', {volume: 0.2});
			this.time.delayedCall(1000, () => {
				fadeBetweenScenes(this.game, GameRouter.StageSelectScene.key, GameRouter.PlayScene.key, true, { stageLevelName:this.stages[this.selectedStageId].stageLevelName, heroType: this.heroType});
				this.gameManager.reset();
			})
		}

	}
	handleInput() {
	}
	onDestroy(scene) {

		super.onDestroy(scene);


	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
