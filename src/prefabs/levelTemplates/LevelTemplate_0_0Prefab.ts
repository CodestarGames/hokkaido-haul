
// You can write more code here

/* START OF COMPILED CODE */

import LevelTemplatePrefabBase from "./LevelTemplatePrefabBase";
import overpassPrefab from "./overpassPrefab";
import enemyPrefab from "../actors/enemyPrefab";
import enemyDrone from "../actors/enemyDrone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class LevelTemplate_0_0Prefab extends LevelTemplatePrefabBase {

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

		// roadTileSprite_4
		const roadTileSprite_4 = new overpassPrefab(scene, 721, 254);
		this.add(roadTileSprite_4);

		// enemyPrefab1
		const enemyPrefab1 = new enemyPrefab(scene, 567, 248);
		this.add(enemyPrefab1);

		// enemyPrefab_1
		const enemyPrefab_1 = new enemyPrefab(scene, 814, 249, "bear");
		this.add(enemyPrefab_1);

		// enemyDroneInst
		const enemyDroneInst = new enemyDrone(scene, 499, 320);
		this.add(enemyDroneInst);

		// enemyDroneInst_1
		const enemyDroneInst_1 = new enemyDrone(scene, 182, 319);
		this.add(enemyDroneInst_1);

		// enemyDroneInst_2
		const enemyDroneInst_2 = new enemyDrone(scene, 1117, 189);
		this.add(enemyDroneInst_2);

		// enemyDroneInst_3
		const enemyDroneInst_3 = new enemyDrone(scene, 954, 316);
		this.add(enemyDroneInst_3);

		// roadTileSprite_2
		const roadTileSprite_2 = new overpassPrefab(scene, 241, 254);
		this.add(roadTileSprite_2);

		this.roadTileSprite = roadTileSprite;
		this.roadTileSprite_1 = roadTileSprite_1;
		this.roadTileSprite_3 = roadTileSprite_3;
		this.roadTileSprite_4 = roadTileSprite_4;
		this.roadTileSprite_2 = roadTileSprite_2;
		// awake handler
		this.scene.events.once("scene-awake", () => this.awake());

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public roadTileSprite: Phaser.GameObjects.TileSprite;
	public roadTileSprite_1: Phaser.GameObjects.TileSprite;
	public roadTileSprite_3: Phaser.GameObjects.TileSprite;
	public roadTileSprite_4: overpassPrefab;
	public roadTileSprite_2: overpassPrefab;
	public parentLayer!: Phaser.GameObjects.Layer;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
