import GameManagerSingleton from "./GameManagerSingleton";

import Phaser from "phaser";
import {GameExtended} from "../gameExtended";
import {ControlsPlugin} from "../plugins/ControlPlugin";
import Vector2 = Phaser.Math.Vector2;


export default abstract class SceneExtended extends Phaser.Scene {
	parentZone: Phaser.GameObjects.Zone;
	parentZonePos: Vector2;
	controls!: ControlsPlugin;

	constructor(props) {
		super(props);
	}

    get gameManager(): GameManagerSingleton {
		return (this.game as GameExtended).gameManager;
	};

	create(data){
		this.editorCreate()
		this.scene.scene.events.on('destroy', this.onDestroy);

		this.controls.start();
	}

	abstract editorCreate();

	abstract handleInput();

	onDestroy(scene) {

	}

	update(time, dt) {
		this.handleInput();
	}

	setParentZone(pos, zone: Phaser.GameObjects.Zone) {
		this.parentZonePos = pos;
		this.parentZone = zone;
		this.cameras.main.setViewport(pos.x, pos.y, this.parentZone.width, this.parentZone.height);
		this.scene.bringToTop(this.scene.key);
	}


}

