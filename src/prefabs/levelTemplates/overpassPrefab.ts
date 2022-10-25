
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import PlayScene from "../../PlayScene";
import overpassColumnPrefab from "../overpassColumnPrefab";
/* END-USER-IMPORTS */

export default class overpassPrefab extends Phaser.GameObjects.TileSprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, width ?? 480, height ?? 32, texture || "overpass", frame);

		this.setOrigin(0, 0);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once("update", () => this.awake());

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	awake() {
		debugger
		let overpassPillar1 = new overpassColumnPrefab(this.scene, this.getBottomLeft().x, this.getBottomLeft().y)
		let overpassPillar2 = new overpassColumnPrefab(this.scene, this.getBottomCenter().x- 8, this.getBottomCenter().y)
		let overpassPillar3 = new overpassColumnPrefab(this.scene, this.getBottomRight().x - 16, this.getBottomRight().y)
		this.scene.add.existing(overpassPillar1);
		this.scene.add.existing(overpassPillar2);
		this.scene.add.existing(overpassPillar3);
		(this.scene as PlayScene).level_layer.add(overpassPillar1);
		(this.scene as PlayScene).level_layer.add(overpassPillar2);
		(this.scene as PlayScene).level_layer.add(overpassPillar3);
		(this.scene as PlayScene).level_layer.sendToBack(overpassPillar1);
		(this.scene as PlayScene).level_layer.sendToBack(overpassPillar2);
		(this.scene as PlayScene).level_layer.sendToBack(overpassPillar3);
		(this.scene as PlayScene).pillarsGroup.add(overpassPillar1);
		(this.scene as PlayScene).pillarsGroup.add(overpassPillar2);
		(this.scene as PlayScene).pillarsGroup.add(overpassPillar3);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
