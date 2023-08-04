
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
import baseStageScene from "./common/BaseStageScene";
import {GameRouter} from "./common/GameRouter";
import {IronmouseHeroType} from "./common/Actors/Hero/DefaultHeroType";
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
		const hero = new Hero(this, 96, 388);
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
	dist: number;
	create(props) {
		super.create(props);
		this.dist = props.dist;

		let bgStr = this.stageLevelName === 'akiba' ? 'city' : 'mountain';
		this.mountain_bg.setTexture(`${bgStr}-bg`);
		let musicStr = this.stageLevelName === 'akiba' ? 'akiba-level' : 'main-music';
		this.sound.play(musicStr, {loop: true, volume: 0.18});

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

		let bldPrefix = this.stageLevelName === 'akiba' ? 'building' : 'house';

		let first = this.add.image(16, this.levelTemplateInst.roadTileSprite.getTopLeft().y - 16, `${bldPrefix}-1`).setOrigin(0, 1)

		let blds = [first];
		this.bg_houses_layer.add(first);
		let i = 0;
		while(i < 8) {
			let lastEnt = blds.reverse()[0];
			let newHouse = this.add.image(lastEnt.getRightCenter().x + 4, lastEnt.getBottomRight().y, `${bldPrefix}-${Phaser.Math.RND.weightedPick([1,2,3,4])}`).setOrigin(0, 1)
			blds.push(newHouse)
			this.bg_houses_layer.add(newHouse);
			i++;
			console.log(newHouse.x);
			if(newHouse.getTopLeft().x >= 480) break;
		}

		this.houses.addMultiple(blds);

		this.bikesChris.play('anim-bikes-chris', true)
		this.bikesConnor.play('anim-bikes-connor', true)
		if(this.stageLevelName === 'akiba') {
			this.bikesConnor.visible = false;
			if(this.hero.heroType instanceof IronmouseHeroType) {
				this.bikesChris.play('anim-player-van-idle');
				this.bikesChris.y -= 20;
			}
			else {
				this.bikesChris.play('anim-ironmouse-idle');
				this.bikesChris.y -= 28;
			}
		}

		this.hUDPanelPrefabInst.energyBlocks.forEach(item => {
			item.setTexture(this.stageLevelName === 'akiba' ? 'cimmaroll-small' : 'rootbeer-small')
		})

	}

	get bikes() {
		return [this.bikesChris, this.bikesConnor]
	}

	moveLevel() {
		if(this.gameManager.currentGameState === GAME_SCENE_STATE.GAME_SCROLL) {

			Phaser.Actions.IncX(this.houses.getChildren(), -this.gameManager.gameSpeed);
			//Phaser.Actions.WrapInRectangle(this.houses.getChildren(), new Phaser.Geom.Rectangle(-160, 0, 480 + 160, 416))

			this.mountain_bg.scrollFactorX = 0;
			this.mountain_bg.tilePositionX += .05 + (this.gameManager.gameSpeed * 0.05);

			Phaser.Actions.IncX(this.templateBoundsGroup.getChildren(), -this.gameManager.gameSpeed);
			Phaser.Actions.IncX(this.pillarsGroup.getChildren(), -this.gameManager.gameSpeed);

			this.houses.getChildren().forEach((house: Phaser.GameObjects.Image, index: number, arr: any) => {
				if (house.active && house.getRightCenter().x <= 0) {
					this.houses.killAndHide(house);
					this.houses.remove(house, true);
					house.destroy(true);
				}
				let bldPrefix = this.stageLevelName === 'akiba' ? 'building' : 'house';
				if(house.active && house.getRightCenter().x <= 480 && index === arr.length - 1) {
					let newHouse = this.add.image(house.getRightCenter().x + 4, house.getBottomRight().y, `${bldPrefix}-${Phaser.Math.RND.weightedPick([1,2,3,4])}`).setOrigin(0, 1)
					this.houses.add(newHouse)
					this.bg_houses_layer.add(newHouse);
				}
				});

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

	onUpdate(dt) {
		super.onUpdate(dt);

		this.moveLevel();
	}

	onDestroy(scene) {

		super.onDestroy(scene);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
