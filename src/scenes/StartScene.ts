
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";
/* START-USER-IMPORTS */
import {fadeBetweenScenes} from "../common/utils";
import {GameRouter} from "../common/GameRouter";
/* END-USER-IMPORTS */

export default class StartScene extends SceneExtended {

	constructor() {
		super("StartScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// premierTendoImg
		const premierTendoImg = this.add.image(240, -58, "PremierTendo");
		premierTendoImg.scaleX = 4;
		premierTendoImg.scaleY = 4;

		this.premierTendoImg = premierTendoImg;

		this.events.emit("scene-awake");
	}

	public premierTendoImg!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.tweens.add({
			targets: [this.premierTendoImg],
			y: 208,
			duration: 4000,
			onComplete: () => {
				this.sound.play('sfxCoin', {volume: 0.2});
				this.time.delayedCall(2000, () => {
					fadeBetweenScenes(this.game, GameRouter.StartScene.key, GameRouter.OpeningCreditsScene.key);
				});
			}
		})
	}

	handleInput() {

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
