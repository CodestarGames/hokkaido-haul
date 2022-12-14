
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";
/* START-USER-IMPORTS */
import {fadeBetweenScenes} from "../common/utils";
import {GameRouter} from "../common/GameRouter";
/* END-USER-IMPORTS */

export default class GameCompleteScene extends SceneExtended {

	constructor() {
		super("GameCompleteScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// titleText
		const titleText = this.add.bitmapText(240, 39, "pixel", "CONGRATULATIONS!");
		titleText.scaleX = 2;
		titleText.scaleY = 2.5;
		titleText.setOrigin(0.5, 0.5);
		titleText.tintFill = true;
		titleText.tintTopLeft = 5013592;
		titleText.tintTopRight = 5013592;
		titleText.tintBottomLeft = 5013592;
		titleText.tintBottomRight = 5013592;
		titleText.text = "CONGRATULATIONS!";
		titleText.fontSize = 12;
		titleText.maxWidth = 358;

		// finalScoreText
		const finalScoreText = this.add.bitmapText(240, 353, "pixel", "Final score: 0");
		finalScoreText.scaleX = 2;
		finalScoreText.scaleY = 2.5;
		finalScoreText.setOrigin(0.5, 0.5);
		finalScoreText.tintFill = true;
		finalScoreText.tintTopLeft = 5013592;
		finalScoreText.tintTopRight = 5013592;
		finalScoreText.tintBottomLeft = 5013592;
		finalScoreText.tintBottomRight = 5013592;
		finalScoreText.text = "Final score: 0";
		finalScoreText.fontSize = 8;
		finalScoreText.maxWidth = 358;

		// title
		this.add.image(240, 287, "title");

		// titleText_1
		const titleText_1 = this.add.bitmapText(240, 101, "pixel", "You completed the ");
		titleText_1.scaleX = 2;
		titleText_1.scaleY = 2.5;
		titleText_1.setOrigin(0.5, 0.5);
		titleText_1.tintFill = true;
		titleText_1.tintTopLeft = 5013592;
		titleText_1.tintTopRight = 5013592;
		titleText_1.tintBottomLeft = 5013592;
		titleText_1.tintBottomRight = 5013592;
		titleText_1.text = "You completed the ";
		titleText_1.fontSize = 8;
		titleText_1.maxWidth = 358;

		// titleText_2
		const titleText_2 = this.add.bitmapText(240, 390, "pixel", "press space or A button");
		titleText_2.scaleX = 2;
		titleText_2.scaleY = 2.5;
		titleText_2.setOrigin(0.5, 0.5);
		titleText_2.tintFill = true;
		titleText_2.tintTopLeft = 5013592;
		titleText_2.tintTopRight = 5013592;
		titleText_2.tintBottomLeft = 5013592;
		titleText_2.tintBottomRight = 5013592;
		titleText_2.text = "press space or A button";
		titleText_2.fontSize = 6;
		titleText_2.maxWidth = 358;

		this.titleText = titleText;
		this.finalScoreText = finalScoreText;
		this.titleText_1 = titleText_1;
		this.titleText_2 = titleText_2;

		this.events.emit("scene-awake");
	}

	public titleText!: Phaser.GameObjects.BitmapText;
	public finalScoreText!: Phaser.GameObjects.BitmapText;
	public titleText_1!: Phaser.GameObjects.BitmapText;
	public titleText_2!: Phaser.GameObjects.BitmapText;

	/* START-USER-CODE */

	// Write your code here

	create(props) {
		super.create(props);
		this.sound.play('game-complete-music', {loop: true, volume: 0.4});
		this.finalScoreText.text = "Final Score: " + this.gameManager.score;

		this.time.delayedCall(2000, () => {
			this.input.keyboard.once('keydown-SPACE', () => {
				this.sound.play('sfxStart', {volume: 0.2});
				this.time.delayedCall(1000, () => {
					fadeBetweenScenes(this.game, GameRouter.GameCompleteScene.key, GameRouter.TitleScene.key);
				})
			});

			this.input.gamepad.once(Phaser.Input.Gamepad.Events.BUTTON_DOWN, (pad: Phaser.Input.Gamepad.Gamepad) => {
				if(pad.A) {
					this.sound.play('sfxStart', {volume: 0.2});
					this.time.delayedCall(1000, () => {
						fadeBetweenScenes(this.game, GameRouter.GameCompleteScene.key, GameRouter.TitleScene.key);
					})
				}
			});
		});
	}

	handleInput() {

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
