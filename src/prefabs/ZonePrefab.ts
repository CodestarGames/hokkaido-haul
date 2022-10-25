import Phaser from "phaser";

export default class ZonePrefab extends Phaser.GameObjects.Zone {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number) {
		super(scene, x ?? 0, y ?? 0, width ?? 540, height ?? 480);

		this.setOrigin(0, 0);

	}

}
