
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";
/* START-USER-IMPORTS */
import {GameRouter} from "../common/GameRouter";
import {fadeBetweenScenes} from "../common/utils";
/* END-USER-IMPORTS */

export default class TitleScene extends SceneExtended {

	constructor() {
		super("TitleScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// mountain_bg
		const mountain_bg = this.add.tileSprite(0, 0, 480, 416, "mountain-bg");
		mountain_bg.setOrigin(0, 0);

		// bg_houses_layer
		const bg_houses_layer = this.add.layer();

		// roadTileSprite
		const roadTileSprite = this.add.tileSprite(0, 385, 480, 32, "road");
		roadTileSprite.setOrigin(0, 0);

		// sidewalkTileSprite
		const sidewalkTileSprite = this.add.tileSprite(0, 351, 480, 32, "sidewalk");
		sidewalkTileSprite.setOrigin(0, 0);
		sidewalkTileSprite.tilePositionX = 16;

		// title
		const title = this.add.image(0, 0, "title");
		title.setOrigin(0, 0);

		// van_title
		const van_title = this.add.sprite(79, 334, "van-idle", 0);

		// startText
		const startText = this.add.bitmapText(240, 286, "pixel", "press space or A button");
		startText.scaleX = 2;
		startText.scaleY = 2.5;
		startText.setOrigin(0.5, 0);
		startText.tintFill = true;
		startText.tintTopLeft = 11067555;
		startText.tintTopRight = 11067555;
		startText.tintBottomLeft = 11067555;
		startText.tintBottomRight = 11067555;
		startText.text = "press space or A button";
		startText.fontSize = 6;
		startText.maxWidth = 358;
		startText.dropShadowAlpha = 1;

		// mouse_title
		const mouse_title = this.add.sprite(430, 209, "ironmouse", 0);
		mouse_title.flipX = true;

		this.mountain_bg = mountain_bg;
		this.bg_houses_layer = bg_houses_layer;
		this.roadTileSprite = roadTileSprite;
		this.sidewalkTileSprite = sidewalkTileSprite;
		this.van_title = van_title;
		this.startText = startText;
		this.mouse_title = mouse_title;

		this.events.emit("scene-awake");
	}

	public mountain_bg!: Phaser.GameObjects.TileSprite;
	public bg_houses_layer!: Phaser.GameObjects.Layer;
	public roadTileSprite!: Phaser.GameObjects.TileSprite;
	public sidewalkTileSprite!: Phaser.GameObjects.TileSprite;
	public van_title!: Phaser.GameObjects.Sprite;
	public startText!: Phaser.GameObjects.BitmapText;
	public mouse_title!: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here
	tile_layer_1: Phaser.Tilemaps.TilemapLayer;
	tile_layer_2: Phaser.Tilemaps.TilemapLayer;
	tile_layer_3: Phaser.Tilemaps.TilemapLayer;
	currentTilemap: Phaser.Tilemaps.Tilemap;
	enemies_layer: Phaser.GameObjects.Layer;
	spawner_layer: Phaser.GameObjects.Layer;
	private houses: Phaser.GameObjects.Group;

	create(props) {
		super.create(props)
		this.sound.play('intro-music', {loop: true, volume: 0.4});
		this.houses = this.add.group();
		this.houses.addMultiple([
			this.add.image(this.roadTileSprite.getTopLeft().x - 40, this.roadTileSprite.getTopLeft().y - 16, 'house-1').setOrigin(0, 1),
			this.add.image(this.roadTileSprite.getTopLeft().x + 0, this.roadTileSprite.getTopLeft().y - 16, 'house-4').setOrigin(0, 1),
			this.add.image(this.roadTileSprite.getTopLeft().x + 80, this.roadTileSprite.getTopLeft().y - 16, 'house-2').setOrigin(0, 1),
			this.add.image(this.roadTileSprite.getTopLeft().x + 220, this.roadTileSprite.getTopLeft().y - 16, 'house-3').setOrigin(0, 1),
			this.add.image(this.roadTileSprite.getTopLeft().x + 420, this.roadTileSprite.getTopLeft().y - 16, 'house-5').setOrigin(0, 1),
			this.add.image(this.roadTileSprite.getTopLeft().x + 80, this.roadTileSprite.getTopLeft().y - 16, 'house-2').setOrigin(0, 1),
		]);

		this.houses.getChildren().forEach((child: any, index, ctx) => {
			if(index > 0)
				child.x = (ctx[index-1] as Phaser.GameObjects.Image).getBottomRight().x + 8;
		})

		this.houses.getChildren().forEach((child) => {
			this.bg_houses_layer.add(child);
		})

		this.input.keyboard.once('keydown-SPACE', () => {
			this.sound.play('sfxStart', {volume: 0.2});
			this.time.delayedCall(1000, () => {
				fadeBetweenScenes(this.game, GameRouter.TitleScene.key, GameRouter.CharacterSelectScene.key);
				this.gameManager.reset();
				//this.gameManager.distance = 748;
			})
		});

		this.input.gamepad.once(Phaser.Input.Gamepad.Events.BUTTON_DOWN, (pad: Phaser.Input.Gamepad.Gamepad) => {
			if(pad.A) {
				this.sound.play('sfxStart', {volume: 0.2});
				this.time.delayedCall(1000, () => {
					fadeBetweenScenes(this.game, GameRouter.TitleScene.key, GameRouter.CharacterSelectScene.key);
					this.gameManager.reset();
				})
			}
		});

		this.time.addEvent({
			loop: true,
			callback: () => { this.startText.visible = !this.startText.visible; },
			delay: 700
		})

		this.van_title.play('anim-player-van-idle', true);
		this.mouse_title.play('anim-ironmouse-idle', true);

		//this.bikesChris.play('anim-bikes-chris', true)
		//this.bikesConnor.play('anim-bikes-connor', true)

	}

	update(time, dt) {
		super.update(time, dt);


		Phaser.Actions.IncX(this.houses.getChildren(), -this.gameManager.gameSpeed);
		Phaser.Actions.WrapInRectangle(this.houses.getChildren(), new Phaser.Geom.Rectangle(-160, 0, 480 + 160, 416))

		this.mountain_bg.scrollFactorX = 0;
		this.mountain_bg.tilePositionX += .05 + (this.gameManager.gameSpeed * 0.05);
		this.roadTileSprite.tilePositionX += this.gameManager.gameSpeed;
		this.sidewalkTileSprite.tilePositionX += this.gameManager.gameSpeed;
	}

	handleInput() {
	}

	onDestroy(scene) {

		super.onDestroy(scene);


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
