
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PanelPrefab from "./PanelPrefab";
/* START-USER-IMPORTS */
import {choose} from "../../common/utils";
/* END-USER-IMPORTS */

export default class DialogPanelPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// backgroundNinePatch
		const backgroundNinePatch = new PanelPrefab(scene, 0, 0);
		this.add(backgroundNinePatch);

		// avatarImg
		const avatarImg = scene.add.image(0, 0, "avatars", 1);
		avatarImg.setOrigin(0, 0);
		this.add(avatarImg);

		// text
		const text = scene.add.bitmapText(116, 8, "pixel", "The stupid muppet jumped over the brown dog. It's time for premiere two~! the quick brown fox jumped over the lazy dog. 0123456789 !,;:");
		text.scaleX = 2;
		text.scaleY = 2.5;
		text.tintFill = true;
		text.tintTopLeft = 5013592;
		text.tintTopRight = 5013592;
		text.tintBottomLeft = 5013592;
		text.tintBottomRight = 5013592;
		text.text = "The stupid muppet jumped over the brown dog. It's time for premiere two~! the quick brown fox jumped over the lazy dog. 0123456789 !,;:";
		text.fontSize = 6;
		text.maxWidth = 358;
		this.add(text);

		this.backgroundNinePatch = backgroundNinePatch;
		this.avatarImg = avatarImg;
		this.text = text;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.text.text = '';

		/* END-USER-CTR-CODE */
	}

	public backgroundNinePatch: PanelPrefab;
	public avatarImg: Phaser.GameObjects.Image;
	public text: Phaser.GameObjects.BitmapText;

	/* START-USER-CODE */

	// Write your code here.
	async typewriteBitmapText(text) {
		this.text.setText(text)

		const bounds = this.text.getTextBounds(false)
		const wrappedText = bounds['wrappedText'] || text

		this.text.setText('')

		const length = wrappedText.length
		let i = 0

		let retProm = new Promise(resolve => {

			this.scene.time.addEvent({
				callback: () => {
					this.text.text += wrappedText[i]
					++i

					if(i === length - 1) {
						this.scene.time.delayedCall(1000, () => {
							resolve(true);
						})
					}
				},
				repeat: length - 1,
				delay: 40
			});

		});



		return retProm;

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
