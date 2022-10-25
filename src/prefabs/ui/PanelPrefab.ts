
// You can write more code here

/* START OF COMPILED CODE */

import NinePatchImage from "../../plugins/NinePatchImage";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PanelPrefab extends NinePatchImage {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, width ?? 480, height ?? 96, texture || "windowPanel", frame);

		this.setOrigin(0, 0);
		this.marginLeft = 4;
		this.marginTop = 4;
		this.marginRight = 4;
		this.marginBottom = 4;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
