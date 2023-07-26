
// You can write more code here

/* START OF COMPILED CODE */

import SceneExtended from "../common/SceneExtended";

/* START-USER-IMPORTS */
import {fadeBetweenScenes} from "../common/utils";
import {GameRouter} from "../common/GameRouter";
import {HeroType} from "../common/Actors/Hero/HeroType";
import {DefaultHeroType, IronmouseHeroType} from "../common/Actors/Hero/DefaultHeroType";
/* END-USER-IMPORTS */

export default class CharacterSelectScene extends SceneExtended {

	constructor() {
		super("CharacterSelectScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// selectRect
		const selectRect = this.add.rectangle(239, 147, 420, 128);
		selectRect.fillColor = 12314499;
		selectRect.isStroked = true;
		selectRect.strokeColor = 3958591;
		selectRect.lineWidth = 3;

		// titleText_1
		const titleText_1 = this.add.bitmapText(240, 38, "pixel", "Character Select");
		titleText_1.scaleX = 2;
		titleText_1.scaleY = 2.5;
		titleText_1.setOrigin(0.5, 0.5);
		titleText_1.tintFill = true;
		titleText_1.tintTopLeft = 5013592;
		titleText_1.tintTopRight = 5013592;
		titleText_1.tintBottomLeft = 5013592;
		titleText_1.tintBottomRight = 5013592;
		titleText_1.text = "Character Select";
		titleText_1.fontSize = 10;
		titleText_1.maxWidth = 358;

		// titleText_2
		const titleText_2 = this.add.bitmapText(168, 325, "pixel", "Special: Hold Jump \nbutton to hover");
		titleText_2.scaleX = 2;
		titleText_2.scaleY = 2.5;
		titleText_2.setOrigin(0.5, 0.5);
		titleText_2.tintFill = true;
		titleText_2.tintTopLeft = 5013592;
		titleText_2.tintTopRight = 5013592;
		titleText_2.tintBottomLeft = 5013592;
		titleText_2.tintBottomRight = 5013592;
		titleText_2.text = "Special: Hold Jump \nbutton to hover";
		titleText_2.fontSize = 6;
		titleText_2.maxWidth = 358;

		// titleText
		const titleText = this.add.bitmapText(168, 170, "pixel", "Special: Double Tap \njump button to dash");
		titleText.scaleX = 2;
		titleText.scaleY = 2.5;
		titleText.setOrigin(0.5, 0.5);
		titleText.tintFill = true;
		titleText.tintTopLeft = 5013592;
		titleText.tintTopRight = 5013592;
		titleText.tintBottomLeft = 5013592;
		titleText.tintBottomRight = 5013592;
		titleText.text = "Special: Double Tap \njump button to dash";
		titleText.fontSize = 6;
		titleText.maxWidth = 358;

		// titleText_3
		const titleText_3 = this.add.bitmapText(168, 124, "pixel", "Van Gang");
		titleText_3.scaleX = 2;
		titleText_3.scaleY = 2.5;
		titleText_3.setOrigin(0.5, 0.5);
		titleText_3.tintFill = true;
		titleText_3.tintTopLeft = 5013592;
		titleText_3.tintTopRight = 5013592;
		titleText_3.tintBottomLeft = 5013592;
		titleText_3.tintBottomRight = 5013592;
		titleText_3.text = "Van Gang";
		titleText_3.fontSize = 8;
		titleText_3.maxWidth = 358;

		// titleText_4
		const titleText_4 = this.add.bitmapText(168, 277, "pixel", "Ironmouse");
		titleText_4.scaleX = 2;
		titleText_4.scaleY = 2.5;
		titleText_4.setOrigin(0.5, 0.5);
		titleText_4.tintFill = true;
		titleText_4.tintTopLeft = 5013592;
		titleText_4.tintTopRight = 5013592;
		titleText_4.tintBottomLeft = 5013592;
		titleText_4.tintBottomRight = 5013592;
		titleText_4.text = "Ironmouse";
		titleText_4.fontSize = 8;
		titleText_4.maxWidth = 358;

		// mouse_title
		const mouse_title = this.add.sprite(378, 302, "ironmouse", 0);
		mouse_title.flipX = true;

		// van_title
		const van_title = this.add.sprite(378, 148, "van-idle", 0);

		this.selectRect = selectRect;
		this.titleText_1 = titleText_1;
		this.titleText_2 = titleText_2;
		this.titleText = titleText;
		this.titleText_3 = titleText_3;
		this.titleText_4 = titleText_4;
		this.mouse_title = mouse_title;
		this.van_title = van_title;

		this.events.emit("scene-awake");
	}

	private selectRect!: Phaser.GameObjects.Rectangle;
	public titleText_1!: Phaser.GameObjects.BitmapText;
	public titleText_2!: Phaser.GameObjects.BitmapText;
	public titleText!: Phaser.GameObjects.BitmapText;
	public titleText_3!: Phaser.GameObjects.BitmapText;
	public titleText_4!: Phaser.GameObjects.BitmapText;
	public mouse_title!: Phaser.GameObjects.Sprite;
	public van_title!: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here
	handleInput() {
	}

	create(data) {
		super.create(data);
		this.sound.play('character-select-music', {loop: true, volume: 0.2});
		this.van_title.play('anim-player-van-idle', true);
		this.heroType = new DefaultHeroType();
	}

	heroType: HeroType;

	update(time, dt) {
		super.update(time, dt);

		if(this.controls.up.isPressed) {
			if(this.selectRect.y !== 147)
				this.sound.play('sfxStart', {volume: 0.2});
			this.selectRect.setPosition(239, 147);
			this.van_title.play('anim-player-van-idle', true);
			this.mouse_title.anims.stop();
			this.heroType = new DefaultHeroType()
		}

		if(this.controls.down.isPressed) {
			if(this.selectRect.y !== 300)
				this.sound.play('sfxStart', {volume: 0.2});
			this.selectRect.setPosition(239, 300);
			this.van_title.anims.stop();
			this.mouse_title.play('anim-ironmouse-idle', true);
			this.heroType = new IronmouseHeroType()
		}

		if(this.controls.jump.isPressed) {
			this.controls.stop();

			this.sound.play('sfxStart', {volume: 0.2});
			this.time.delayedCall(1000, () => {
				fadeBetweenScenes(this.game, GameRouter.CharacterSelectScene.key, GameRouter.StageSelectScene.key, false, {heroType: this.heroType});
				this.gameManager.reset();
			})
		}
	}

	onDestroy(scene) {

		super.onDestroy(scene);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
