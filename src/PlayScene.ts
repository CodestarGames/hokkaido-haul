
// You can write more code here

/* START OF COMPILED CODE */

import BaseStageScene from "./common/BaseStageScene";
import LevelTemplateFlatLoopPrefab from "./prefabs/levelTemplates/LevelTemplateFlatLoopPrefab";
import Hero from "./common/Actors/Hero/Hero";
import HUDPanelPrefab from "./prefabs/ui/HUDPanelPrefab";
import DialogPanelPrefab from "./prefabs/ui/DialogPanelPrefab";
/* START-USER-IMPORTS */
import {GameExtended} from "./gameExtended";
import {BTreeResultAction} from "./common/Actions/BTreeResultAction";
import PlaySceneBtree from "./common/BTree/PlaySceneBtree";
import {GAME_SCENE_STATE, TEMPLATE_GEN_TYPE} from "./common/GameManagerSingleton";
import LevelTemplate_0_0Prefab from "./prefabs/levelTemplates/LevelTemplate_0_0Prefab";
import {choose} from "./common/utils";
import LevelTemplate_0_2Prefab from "./prefabs/levelTemplates/LevelTemplate_0_2Prefab";
import LevelTemplate_0_1Prefab from "./prefabs/levelTemplates/LevelTemplate_0_1Prefab";
import LevelTemplate_0_4Prefab from "./prefabs/levelTemplates/LevelTemplate_0_4Prefab";
import LevelTemplate_0_5Prefab from "./prefabs/levelTemplates/LevelTemplate_0_5Prefab";
import LevelTemplate_0_3Prefab from "./prefabs/levelTemplates/LevelTemplate_0_3Prefab";
import LevelTemplate_0_7Prefab from "./prefabs/levelTemplates/LevelTemplate_0_7Prefab";
import LevelTemplate_0_6Prefab from "./prefabs/levelTemplates/LevelTemplate_0_6Prefab";
import LevelTemplate_0_8Prefab from "./prefabs/levelTemplates/LevelTemplate_0_8Prefab";
import LevelTemplate_0_9Prefab from "./prefabs/levelTemplates/LevelTemplate_0_9Prefab";
/* END-USER-IMPORTS */

export default class PlayScene extends BaseStageScene {

	constructor() {
		super("PlayScene");

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

		// level_layer
		const level_layer = this.add.layer();

		// levelTemplateInst
		const levelTemplateInst = new LevelTemplateFlatLoopPrefab(this, -128, 0);
		level_layer.add(levelTemplateInst);

		// hero
		const hero = new Hero(this, 96, 302);
		this.add.existing(hero);

		// speed_effect_layer
		const speed_effect_layer = this.add.layer();
		speed_effect_layer.visible = false;

		// warpTileSprite
		const warpTileSprite = this.add.tileSprite(0, 0, 480, 416, "warp");
		warpTileSprite.setOrigin(0, 0);
		speed_effect_layer.add(warpTileSprite);

		// bikesChris
		const bikesChris = this.add.sprite(248, 361, "bikes", 0);

		// hud_layer
		const hud_layer = this.add.layer();

		// HUDPanelPrefabInst
		const hUDPanelPrefabInst = new HUDPanelPrefab(this, 0, 0);
		hud_layer.add(hUDPanelPrefabInst);

		// dialogBox
		const dialogBox = new DialogPanelPrefab(this, 0, 0);
		dialogBox.visible = false;
		hud_layer.add(dialogBox);

		// bikesConnor
		const bikesConnor = this.add.sprite(312, 361, "bikes", 4);

		// levelTemplateInst (prefab fields)
		levelTemplateInst.parentLayer = level_layer;

		this.mountain_bg = mountain_bg;
		this.bg_houses_layer = bg_houses_layer;
		this.level_layer = level_layer;
		this.levelTemplateInst = levelTemplateInst;
		this.speed_effect_layer = speed_effect_layer;
		this.warpTileSprite = warpTileSprite;
		this.bikesChris = bikesChris;
		this.hud_layer = hud_layer;
		this.hUDPanelPrefabInst = hUDPanelPrefabInst;
		this.dialogBox = dialogBox;
		this.bikesConnor = bikesConnor;

		this.events.emit("scene-awake");
	}

	public mountain_bg!: Phaser.GameObjects.TileSprite;
	public bg_houses_layer!: Phaser.GameObjects.Layer;
	public level_layer!: Phaser.GameObjects.Layer;
	public levelTemplateInst!: LevelTemplateFlatLoopPrefab;
	public speed_effect_layer!: Phaser.GameObjects.Layer;
	public warpTileSprite!: Phaser.GameObjects.TileSprite;
	public bikesChris!: Phaser.GameObjects.Sprite;
	public hud_layer!: Phaser.GameObjects.Layer;
	public hUDPanelPrefabInst!: HUDPanelPrefab;
	public dialogBox!: DialogPanelPrefab;
	public bikesConnor!: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	tile_layer_1: Phaser.Tilemaps.TilemapLayer;
	tile_layer_2: Phaser.Tilemaps.TilemapLayer;
	tile_layer_3: Phaser.Tilemaps.TilemapLayer;
	currentTilemap: Phaser.Tilemaps.Tilemap;
	enemies_layer: Phaser.GameObjects.Layer;
	spawner_layer: Phaser.GameObjects.Layer;
	BTree: any;

	// Write your code here
	private houses: Phaser.GameObjects.Group;
	create(props) {
		super.create(props);

		this.sound.play('main-music', {loop: true, volume: 0.2});

		let game = (this.game as GameExtended);
		let playSceneBlackboard = {
			game,
			introDone: false
		};

		this.BTree = game.BTreeManager.start(PlaySceneBtree, -1, playSceneBlackboard, null);
		this.BTree.postUpdate = () => {
			let bTreeAction = new BTreeResultAction(this.BTree.state);

			game.addAction(bTreeAction);
		}

		this.houses = this.add.group();
		this.houses.addMultiple([
			this.add.image(this.levelTemplateInst.roadTileSprite.getTopLeft().x - 40, this.levelTemplateInst.roadTileSprite.getTopLeft().y - 16, 'house-1').setOrigin(0, 1),
			this.add.image(this.levelTemplateInst.roadTileSprite.getTopLeft().x + 0, this.levelTemplateInst.roadTileSprite.getTopLeft().y - 16, 'house-4').setOrigin(0, 1),
			this.add.image(this.levelTemplateInst.roadTileSprite.getTopLeft().x + 80, this.levelTemplateInst.roadTileSprite.getTopLeft().y - 16, 'house-2').setOrigin(0, 1),
			this.add.image(this.levelTemplateInst.roadTileSprite.getTopLeft().x + 220, this.levelTemplateInst.roadTileSprite.getTopLeft().y - 16, 'house-3').setOrigin(0, 1),
			this.add.image(this.levelTemplateInst.roadTileSprite.getTopLeft().x + 420, this.levelTemplateInst.roadTileSprite.getTopLeft().y - 16, 'house-5').setOrigin(0, 1),
			this.add.image(this.levelTemplateInst.roadTileSprite.getTopLeft().x + 80, this.levelTemplateInst.roadTileSprite.getTopLeft().y - 16, 'house-2').setOrigin(0, 1),
		]);

		this.houses.getChildren().forEach((child: any, index, ctx) => {
			if(index > 0)
				child.x = (ctx[index-1] as Phaser.GameObjects.Image).getBottomRight().x + 8;
			this.bg_houses_layer.add(child);
		})

		this.bikesChris.play('anim-bikes-chris', true)
		this.bikesConnor.play('anim-bikes-connor', true)

	}

	get bikes() {
		return [this.bikesChris, this.bikesConnor]
	}

	moveLevel() {
		if(this.gameManager.currentGameState === GAME_SCENE_STATE.GAME_SCROLL) {

			Phaser.Actions.IncX(this.houses.getChildren(), -this.gameManager.gameSpeed);
			Phaser.Actions.WrapInRectangle(this.houses.getChildren(), new Phaser.Geom.Rectangle(-160, 0, 480 + 160, 416))

			this.mountain_bg.scrollFactorX = 0;
			this.mountain_bg.tilePositionX += .05 + (this.gameManager.gameSpeed * 0.05);

			Phaser.Actions.IncX(this.templateBoundsGroup.getChildren(), -this.gameManager.gameSpeed);
			Phaser.Actions.IncX(this.pillarsGroup.getChildren(), -this.gameManager.gameSpeed);

			this.templateBoundsGroup.getChildren().forEach((boundsRect: Phaser.GameObjects.Rectangle) => {
				if (boundsRect.active && boundsRect.getRightCenter().x <= 480) {
					this.templateBoundsGroup.killAndHide(boundsRect);
					this.templateBoundsGroup.remove(boundsRect, true);
					boundsRect.destroy(true);

					this.spawnTemplateSection()
				}
			});

			this.pillarsGroup.getChildren().forEach((boundsRect: Phaser.GameObjects.Rectangle) => {
				if (boundsRect.getBounds().right < 0) {
					this.pillarsGroup.killAndHide(boundsRect);
					this.pillarsGroup.remove(boundsRect, true);
					boundsRect.destroy(true);
				}
			});


			//Phaser.Actions.IncX(this.enemyCollisionGroup.getChildren(), -this.gameManager.gameSpeed);
			this.enemyCollisionGroup.getChildren().forEach((obstacle: any) => {
				if (obstacle.getBounds().right < 0) {
					this.enemyCollisionGroup.killAndHide(obstacle);
				}
			})

			this.staticPhysicsItemsGroup.getChildren().forEach((obstacle: any) => {
				if (obstacle.getBounds().right < 0) {
					this.staticPhysicsItemsGroup.killAndHide(obstacle);
				}
			})

			Phaser.Actions.IncX(this.staticPhysicsItemsGroup.getChildren(), -this.gameManager.gameSpeed);
			Phaser.Actions.IncX(this.staticPhysicsItemsGroup.getChildren().map(item => item.body as any), -this.gameManager.gameSpeed);
		}
	}

	spawnTemplateSection() {
		let levelTemplateInst;
		switch (this.gameManager.templateGenType) {
			case TEMPLATE_GEN_TYPE.RANDOM_0:
				levelTemplateInst = choose([
					() => new LevelTemplate_0_0Prefab(this, 476, 0),
					() => new LevelTemplate_0_1Prefab(this, 476, 0),
					() => new LevelTemplate_0_2Prefab(this, 476, 0),
					() => new LevelTemplate_0_3Prefab(this, 476, 0),
					() => new LevelTemplate_0_4Prefab(this, 476, 0),
					() => new LevelTemplate_0_5Prefab(this, 476, 0),
					() => new LevelTemplate_0_6Prefab(this, 476, 0),
					() => new LevelTemplate_0_7Prefab(this, 476, 0),
					() => new LevelTemplate_0_8Prefab(this, 476, 0),
					() => new LevelTemplate_0_9Prefab(this, 476, 0),
				])();
				this.level_layer.add(levelTemplateInst);
				levelTemplateInst.parentLayer = this.level_layer;
				levelTemplateInst.awake();
				break;

			case TEMPLATE_GEN_TYPE.LOOPING_FLAT:
				levelTemplateInst = new LevelTemplateFlatLoopPrefab(this, 480, 0);
				this.level_layer.add(levelTemplateInst);
				levelTemplateInst.parentLayer = this.level_layer;
				levelTemplateInst.awake();
				break;
		}

	}

	update(time, dt) {
		super.update(time, dt);

		this.moveLevel();
	}

	onShutDown(){
		this.BTreeManager.removeTree(this.BTree);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
