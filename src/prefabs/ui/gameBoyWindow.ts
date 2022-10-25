
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ZonePrefab from "../ZonePrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class gameBoyWindow extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// kleebyboy
		const kleebyboy = scene.add.image(0, 0, "kleebyboy");
		kleebyboy.setOrigin(0, 0);
		this.add(kleebyboy);

		// playAreaZone
		const playAreaZone = new ZonePrefab(scene, 80, 48, 480, 416);
		this.add(playAreaZone);

		this.playAreaZone = playAreaZone;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public playAreaZone: ZonePrefab;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
