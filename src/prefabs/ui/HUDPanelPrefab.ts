
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PanelPrefab from "./PanelPrefab";
import baseStageScene from "../../common/BaseStageScene";
import {GameRouter} from "../../common/GameRouter";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class HUDPanelPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? -2);

		// HUDPanelPrefab
		const hUDPanelPrefab = new PanelPrefab(scene, 0, 0, 480, 48);
		this.add(hUDPanelPrefab);

		// scoreText
		const scoreText = scene.add.bitmapText(16, 7, "pixel", "Donations:$0");
		scoreText.scaleX = 2;
		scoreText.scaleY = 2.5;
		scoreText.tintFill = true;
		scoreText.tintTopLeft = 5013592;
		scoreText.tintTopRight = 5013592;
		scoreText.tintBottomLeft = 5013592;
		scoreText.tintBottomRight = 5013592;
		scoreText.text = "Donations:$0";
		scoreText.fontSize = 6;
		scoreText.maxWidth = 358;
		this.add(scoreText);

		// KMText
		const kMText = scene.add.bitmapText(18, 23, "pixel", "Distance: 0km of 200");
		kMText.scaleX = 2;
		kMText.scaleY = 2.5;
		kMText.tintFill = true;
		kMText.tintTopLeft = 5013592;
		kMText.tintTopRight = 5013592;
		kMText.tintBottomLeft = 5013592;
		kMText.tintBottomRight = 5013592;
		kMText.text = "Distance: 0km of 200";
		kMText.fontSize = 6;
		kMText.maxWidth = 358;
		this.add(kMText);

		// HUDPanelPrefab_1
		const hUDPanelPrefab_1 = scene.add.rectangle(286, 3, 180, 40);
		hUDPanelPrefab_1.setOrigin(0, 0);
		hUDPanelPrefab_1.isStroked = true;
		hUDPanelPrefab_1.strokeColor = 5013592;
		this.add(hUDPanelPrefab_1);

		// energyText
		const energyText = scene.add.bitmapText(298, 7, "pixel", "HYPE");
		energyText.scaleX = 2;
		energyText.scaleY = 2.5;
		energyText.tintFill = true;
		energyText.tintTopLeft = 5013592;
		energyText.tintTopRight = 5013592;
		energyText.tintBottomLeft = 5013592;
		energyText.tintBottomRight = 5013592;
		energyText.text = "HYPE";
		energyText.fontSize = 6;
		energyText.maxWidth = 358;
		this.add(energyText);

		// speedText
		const speedText = scene.add.bitmapText(298, 24, "pixel", "SPEED");
		speedText.scaleX = 2;
		speedText.scaleY = 2.5;
		speedText.tintFill = true;
		speedText.tintTopLeft = 5013592;
		speedText.tintTopRight = 5013592;
		speedText.tintBottomLeft = 5013592;
		speedText.tintBottomRight = 5013592;
		speedText.text = "SPEED";
		speedText.fontSize = 6;
		speedText.maxWidth = 358;
		this.add(speedText);

		// energyRect1
		const energyRect1 = scene.add.image(380, 15, "rootbeer-small");
		this.add(energyRect1);

		// energyRect2
		const energyRect2 = scene.add.image(392, 15, "rootbeer-small");
		this.add(energyRect2);

		// energyRect3
		const energyRect3 = scene.add.image(404, 15, "rootbeer-small");
		this.add(energyRect3);

		// energyRect4
		const energyRect4 = scene.add.image(416, 15, "rootbeer-small");
		this.add(energyRect4);

		// energyRect5
		const energyRect5 = scene.add.image(428, 15, "rootbeer-small");
		this.add(energyRect5);

		// speedRect1
		const speedRect1 = scene.add.rectangle(380, 31, 8, 12);
		speedRect1.isFilled = true;
		speedRect1.fillColor = 5013592;
		this.add(speedRect1);

		// speedRect2
		const speedRect2 = scene.add.rectangle(392, 31, 8, 12);
		speedRect2.isFilled = true;
		speedRect2.fillColor = 5013592;
		this.add(speedRect2);

		// speedRect3
		const speedRect3 = scene.add.rectangle(404, 31, 8, 12);
		speedRect3.isFilled = true;
		speedRect3.fillColor = 5013592;
		this.add(speedRect3);

		// speedRect4
		const speedRect4 = scene.add.rectangle(416, 31, 8, 12);
		speedRect4.isFilled = true;
		speedRect4.fillColor = 5013592;
		this.add(speedRect4);

		// speedRect5
		const speedRect5 = scene.add.rectangle(428, 31, 8, 12);
		speedRect5.isFilled = true;
		speedRect5.fillColor = 5013592;
		this.add(speedRect5);

		this.scoreText = scoreText;
		this.kMText = kMText;
		this.energyText = energyText;
		this.speedText = speedText;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.speedBlocks = [speedRect1, speedRect2, speedRect3, speedRect4, speedRect5];
		this.energyBlocks = [energyRect1, energyRect2, energyRect3, energyRect4, energyRect5];
		/* END-USER-CTR-CODE */
	}

	public scoreText: Phaser.GameObjects.BitmapText;
	public kMText: Phaser.GameObjects.BitmapText;
	public energyText: Phaser.GameObjects.BitmapText;
	public speedText: Phaser.GameObjects.BitmapText;

	/* START-USER-CODE */
	energyBlocks: any[];
	speedBlocks:any[]

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
