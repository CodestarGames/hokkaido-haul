
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";
/* START-USER-IMPORTS */
import {GameRouter} from "../common/GameRouter";
import {fadeBetweenScenes} from "../common/utils";
/* END-USER-IMPORTS */

export default class OpeningCredits extends SceneExtended {

	constructor() {
		super("OpeningCreditsScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// nameText
		const nameText = this.add.bitmapText(240, 198, "pixel", "CodestarCreates");
		nameText.scaleX = 2;
		nameText.scaleY = 2.5;
		nameText.setOrigin(0.5, 0.5);
		nameText.tintFill = true;
		nameText.tintTopLeft = 5013592;
		nameText.tintTopRight = 5013592;
		nameText.tintBottomLeft = 5013592;
		nameText.tintBottomRight = 5013592;
		nameText.text = "CodestarCreates";
		nameText.fontSize = 12;
		nameText.maxWidth = 480;

		// txt2
		const txt2 = this.add.bitmapText(240, 240, "pixel", "presents");
		txt2.scaleX = 2;
		txt2.scaleY = 2.5;
		txt2.setOrigin(0.5, 0.5);
		txt2.tintFill = true;
		txt2.tintTopLeft = 5013592;
		txt2.tintTopRight = 5013592;
		txt2.tintBottomLeft = 5013592;
		txt2.tintBottomRight = 5013592;
		txt2.text = "presents";
		txt2.fontSize = 8;
		txt2.maxWidth = 358;

		// txt
		const txt = this.add.bitmapText(240, 369, "pixel", "music by Cambomb");
		txt.scaleX = 2;
		txt.scaleY = 2.5;
		txt.setOrigin(0.5, 0.5);
		txt.tintFill = true;
		txt.tintTopLeft = 5013592;
		txt.tintTopRight = 5013592;
		txt.tintBottomLeft = 5013592;
		txt.tintBottomRight = 5013592;
		txt.text = "music by Cambomb";
		txt.fontSize = 8;
		txt.maxWidth = 358;

		this.nameText = nameText;
		this.txt2 = txt2;
		this.txt = txt;

		this.events.emit("scene-awake");
	}

	public nameText!: Phaser.GameObjects.BitmapText;
	public txt2!: Phaser.GameObjects.BitmapText;
	public txt!: Phaser.GameObjects.BitmapText;

	/* START-USER-CODE */

	// Write your code here

	create(props) {

		super.create(props);


		this.time.delayedCall(4000, () => {
			fadeBetweenScenes(this.game, GameRouter.OpeningCreditsScene.key, GameRouter.TitleScene.key);
		});
	}

	handleInput() {

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
