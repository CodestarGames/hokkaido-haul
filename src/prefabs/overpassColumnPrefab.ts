
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class overpassColumnPrefab extends Phaser.GameObjects.TileSprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, width ?? 16, height ?? 128, texture || "overpass-pillar", frame);

		this.setOrigin(0, 0);

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
