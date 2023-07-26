
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";
/* START-USER-IMPORTS */

import {fadeBetweenScenes} from "../common/utils";
import {GameRouter} from "../common/GameRouter";
/* END-USER-IMPORTS */

export default class GameOverScene extends SceneExtended {

	constructor() {
		super("GameOverScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// gameOverText
		const gameOverText = this.add.bitmapText(240, 197, "pixel", "GAME OVER");
		gameOverText.scaleX = 2;
		gameOverText.scaleY = 2.5;
		gameOverText.setOrigin(0.5, 0.5);
		gameOverText.tintFill = true;
		gameOverText.tintTopLeft = 5013592;
		gameOverText.tintTopRight = 5013592;
		gameOverText.tintBottomLeft = 5013592;
		gameOverText.tintBottomRight = 5013592;
		gameOverText.text = "GAME OVER";
		gameOverText.fontSize = 12;
		gameOverText.maxWidth = 358;

		// scoreText
		const scoreText = this.add.bitmapText(240, 243, "pixel", "Score: 0");
		scoreText.scaleX = 2;
		scoreText.scaleY = 2.5;
		scoreText.setOrigin(0.5, 0.5);
		scoreText.tintFill = true;
		scoreText.tintTopLeft = 5013592;
		scoreText.tintTopRight = 5013592;
		scoreText.tintBottomLeft = 5013592;
		scoreText.tintBottomRight = 5013592;
		scoreText.text = "Score: 0";
		scoreText.fontSize = 8;
		scoreText.maxWidth = 358;

		// titleText_2
		const titleText_2 = this.add.bitmapText(240, 319, "pixel", "press space or A button");
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

		this.gameOverText = gameOverText;
		this.scoreText = scoreText;
		this.titleText_2 = titleText_2;

		this.events.emit("scene-awake");
	}

	public gameOverText!: Phaser.GameObjects.BitmapText;
	public scoreText!: Phaser.GameObjects.BitmapText;
	public titleText_2!: Phaser.GameObjects.BitmapText;

	/* START-USER-CODE */

	// Write your code here

	inputEnabled = false;
	create(props) {
		super.create(props);

		this.sound.play('game-over-music', {loop: true, volume: 0.4});
		this.scoreText.text = "Score: " + this.gameManager.score;

		this.time.delayedCall(2000, () => {
			this.inputEnabled = true;
		});

	}

	update(time, dt) {
		super.update(time, dt);
		if(this.controls.jump.isPressed && this.inputEnabled) {
			this.inputEnabled = false;
			this.sound.play('sfxStart', {volume: 0.2});
			this.time.delayedCall(1000, () => {
				fadeBetweenScenes(this.game, GameRouter.GameOverScene.key, GameRouter.TitleScene.key);
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
