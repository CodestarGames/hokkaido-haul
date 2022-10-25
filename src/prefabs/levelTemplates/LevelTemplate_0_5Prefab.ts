
// You can write more code here

/* START OF COMPILED CODE */

import LevelTemplatePrefabBase from "./LevelTemplatePrefabBase";
import enemyPrefab from "../actors/enemyPrefab";
import enemyDrone from "../actors/enemyDrone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class LevelTemplate_0_5Prefab extends LevelTemplatePrefabBase {

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
		const roadTileSprite_1 = scene.add.tileSprite(480, 387.69590250651044, 240, 32, "road");
		roadTileSprite_1.setOrigin(0, 0);
		this.add(roadTileSprite_1);

		// roadTileSprite_3
		const roadTileSprite_3 = scene.add.tileSprite(960, 387.69590250651044, 480, 32, "road");
		roadTileSprite_3.setOrigin(0, 0);
		this.add(roadTileSprite_3);

		// enemyPrefab1
		const enemyPrefab1 = new enemyPrefab(scene, 605, 380);
		this.add(enemyPrefab1);

		// enemyPrefabInst
		const enemyPrefabInst = new enemyPrefab(scene, 246, 379, "bear");
		this.add(enemyPrefabInst);

		// enemyPrefab_2
		const enemyPrefab_2 = new enemyPrefab(scene, 979, 381, "bear");
		this.add(enemyPrefab_2);

		// enemyDroneInst_3
		const enemyDroneInst_3 = new enemyDrone(scene, 841, 313);
		this.add(enemyDroneInst_3);

		// enemyDroneInst
		const enemyDroneInst = new enemyDrone(scene, 419, 310);
		this.add(enemyDroneInst);

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
