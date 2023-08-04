
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";
/* START-USER-IMPORTS */

import {HeroType} from "../common/Actors/Hero/HeroType";
import {GameRouter} from "../common/GameRouter";
import {fadeBetweenScenes} from "../common/utils";
/* END-USER-IMPORTS */

export default class SelectDifficultyScene extends SceneExtended {

	constructor() {
		super("SelectDifficultyScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// normalText
		const normalText = this.add.bitmapText(243, 235, "pixel", "Normal (200km)");
		normalText.scaleX = 2;
		normalText.scaleY = 2.5;
		normalText.setOrigin(0.5, 0.5);
		normalText.tintFill = true;
		normalText.tintTopLeft = 5013592;
		normalText.tintTopRight = 5013592;
		normalText.tintBottomLeft = 5013592;
		normalText.tintBottomRight = 5013592;
		normalText.text = "Normal (200km)";
		normalText.fontSize = 8;
		normalText.maxWidth = 358;

		// titleText_1
		const titleText_1 = this.add.bitmapText(241, 64, "pixel", "Difficulty");
		titleText_1.scaleX = 2;
		titleText_1.scaleY = 2.5;
		titleText_1.setOrigin(0.5, 0.5);
		titleText_1.tintFill = true;
		titleText_1.tintTopLeft = 5013592;
		titleText_1.tintTopRight = 5013592;
		titleText_1.tintBottomLeft = 5013592;
		titleText_1.tintBottomRight = 5013592;
		titleText_1.text = "Difficulty";
		titleText_1.fontSize = 10;
		titleText_1.maxWidth = 358;

		// selectRect
		const selectRect = this.add.rectangle(241, 237, 240, 48);
		selectRect.fillColor = 12314499;
		selectRect.isStroked = true;
		selectRect.strokeColor = 3958591;
		selectRect.lineWidth = 3;

		// hardText
		const hardText = this.add.bitmapText(243, 317, "pixel", "Hard (500km)");
		hardText.scaleX = 2;
		hardText.scaleY = 2.5;
		hardText.setOrigin(0.5, 0.5);
		hardText.tintFill = true;
		hardText.tintTopLeft = 5013592;
		hardText.tintTopRight = 5013592;
		hardText.tintBottomLeft = 5013592;
		hardText.tintBottomRight = 5013592;
		hardText.text = "Hard (500km)";
		hardText.fontSize = 8;
		hardText.maxWidth = 358;

		// easyText
		const easyText = this.add.bitmapText(243, 153, "pixel", "Easy (100km)");
		easyText.scaleX = 2;
		easyText.scaleY = 2.5;
		easyText.setOrigin(0.5, 0.5);
		easyText.tintFill = true;
		easyText.tintTopLeft = 5013592;
		easyText.tintTopRight = 5013592;
		easyText.tintBottomLeft = 5013592;
		easyText.tintBottomRight = 5013592;
		easyText.text = "Easy (100km)";
		easyText.fontSize = 8;
		easyText.maxWidth = 358;

		this.normalText = normalText;
		this.titleText_1 = titleText_1;
		this.selectRect = selectRect;
		this.hardText = hardText;
		this.easyText = easyText;

		this.events.emit("scene-awake");
	}

	public normalText!: Phaser.GameObjects.BitmapText;
	public titleText_1!: Phaser.GameObjects.BitmapText;
	private selectRect!: Phaser.GameObjects.Rectangle;
	public hardText!: Phaser.GameObjects.BitmapText;
	public easyText!: Phaser.GameObjects.BitmapText;

	/* START-USER-CODE */

	// Write your code here
	private selectTimeout: number = 0;
	private selectedDifficultyId: number = 1;
	heroType: HeroType;
	levels: any;
	private stageLevelName: string;

	create(props) {
		super.create(props);
		this.heroType = props.heroType;
		this.stageLevelName = props.stageLevelName;
		this.levels = [
			{
				val: 100,
				yPos: this.easyText.y
			},
			{
				val: 200,
				yPos: this.normalText.y
			},
			{
				val: 500,
				yPos: this.hardText.y
			}
		];
	}

	update(time, dt) {
		super.update(time, dt);
		if (this.controls.up.isPressed && this.selectTimeout === 0) {
			if(this.selectedDifficultyId > 0) {
				this.selectTimeout = 1000;
				this.time.delayedCall(500, () => {
					this.selectTimeout = 0;
				})
				this.selectedDifficultyId--;
				if (this.selectRect.y !== this.levels[this.selectedDifficultyId].yPos)
					this.sound.play('sfx-select', {volume: 0.4});
				this.selectRect.setPosition(239, this.levels[this.selectedDifficultyId].yPos);
			}

		}

		if (this.controls.down.isPressed && this.selectTimeout === 0) {
			if(this.selectedDifficultyId < 2) {
				this.selectTimeout = 1000;
				this.time.delayedCall(500, () => {
					this.selectTimeout = 0;
				})
				this.selectedDifficultyId++;
				if (this.selectRect.y !== this.levels[this.selectedDifficultyId].yPos)
					this.sound.play('sfx-select', {volume: 0.4});
				this.selectRect.setPosition(239, this.levels[this.selectedDifficultyId].yPos);
			}


		}

		if (this.controls.jump.isPressed && this.selectTimeout === 0) {

			this.controls.stop();

			this.sound.play('sfxStart', {volume: 0.2});
			this.time.delayedCall(1000, () => {
				fadeBetweenScenes(this.game, GameRouter.SelectDifficultyScene.key, GameRouter.PlayScene.key, true, { stageLevelName:this.stageLevelName, dist: this.levels[this.selectedDifficultyId].val, heroType: this.heroType});
				this.gameManager.reset();
			})
		}
	}

	handleInput() {

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
