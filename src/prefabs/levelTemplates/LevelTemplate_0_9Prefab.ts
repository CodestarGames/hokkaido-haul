
// You can write more code here

/* START OF COMPILED CODE */

import LevelTemplatePrefabBase from "./LevelTemplatePrefabBase";
import enemyPrefabCar from "../actors/enemyPrefabCar";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class LevelTemplate_0_9Prefab extends LevelTemplatePrefabBase {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// boundsRect
		const boundsRect = scene.add.rectangle(0, 0, 1440, 420);
		boundsRect.setOrigin(0, 0);
		boundsRect.visible = false;
		boundsRect.isStroked = true;
		boundsRect.strokeColor = 14174794;
		this.add(boundsRect);

		// roadTileSprite
		const roadTileSprite = scene.add.tileSprite(0, 387.69590250651044, 480, 32, "road");
		roadTileSprite.setOrigin(0, 0);
		this.add(roadTileSprite);

		// roadTileSprite_1
		const roadTileSprite_1 = scene.add.tileSprite(480, 387.69590250651044, 480, 32, "road");
		roadTileSprite_1.setOrigin(0, 0);
		this.add(roadTileSprite_1);

		// roadTileSprite_3
		const roadTileSprite_3 = scene.add.tileSprite(960, 387.69590250651044, 480, 32, "road");
		roadTileSprite_3.setOrigin(0, 0);
		this.add(roadTileSprite_3);

		// enemyPrefabCar_1
		const enemyPrefabCar_1 = new enemyPrefabCar(scene, 491, 387);
		this.add(enemyPrefabCar_1);

		// enemyPrefabCar_2
		const enemyPrefabCar_2 = new enemyPrefabCar(scene, 985, 387);
		this.add(enemyPrefabCar_2);

		// enemyPrefabCar1
		const enemyPrefabCar1 = new enemyPrefabCar(scene, 1407, 388);
		this.add(enemyPrefabCar1);

		this.roadTileSprite = roadTileSprite;
		this.roadTileSprite_1 = roadTileSprite_1;
		this.roadTileSprite_3 = roadTileSprite_3;
		// awake handler
		this.scene.events.once("scene-awake", () => this.awake());

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public roadTileSprite: Phaser.GameObjects.TileSprite;
	public roadTileSprite_1: Phaser.GameObjects.TileSprite;
	public roadTileSprite_3: Phaser.GameObjects.TileSprite;
	public parentLayer!: Phaser.GameObjects.Layer;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
