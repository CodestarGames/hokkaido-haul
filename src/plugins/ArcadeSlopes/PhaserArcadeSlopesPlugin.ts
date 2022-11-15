import Phaser from "phaser";

import processCallback from "./processCallback";
import collideCallback from "./collideCallback";

export default class PhaserArcadeSlopesPlugin extends Phaser.Plugins
    .ScenePlugin {
    spriteLayerCollider: any;
    sprite: any;
    layer: any;
    runOnUpdate: any;
    constructor(scene, pluginManager) {
        super(scene, pluginManager, 'SlopePlugin');

        this.scene = scene;
        this.systems = scene.sys;
        this.spriteLayerCollider = {};
        this.sprite = {};
        this.layer = {};

        if (!scene.sys.settings.isBooted)
            this.systems.events.once("boot", this.boot, this);
    }

    boot() {
        const emitter = this.systems.events;
        emitter.on("shutdown", this.shutdown, this);
        emitter.once("destroy", this.destroy, this);
    }

    init() {}

    start() {}

    preUpdate(time, delta) {}

    update(time, delta) {
        if (this.runOnUpdate) {
            this.runOnUpdate();
            this.runOnUpdate = null;
        }
    }

    postUpdate(time, delta) {}

    manageGoingDownSlope(p, t) {
        if (!t) return;

        let { body } = p;

        if (
            body.onFloor() &&
            Math.abs(body.velocity.x) > 0 &&
            body.velocity.y === 0
        ) {
            let isGoingDown =
                (t.flipX && body.velocity.x > 0) || (!t.flipX && body.velocity.x < 0);
            let dirX = body.velocity.x > 0 ? 1 : -1;

            // !isGoingDown, char.botton == tile.top, tile at +1 -1 is null or not slope
            if (!isGoingDown) {
                let nextSlopeTile = t.tilemapLayer.getTileAt(t.x + 1 * dirX, t.y + 1);
                if (!nextSlopeTile || !nextSlopeTile.properties.slope) {
                    let top = t.getTop(this.scene.cameras.main);
                    if (body.bottom === top) {
                        return;
                    }
                }
            }

            /*if (isGoingDown) {
              let side = body.num.x > 0 ? body.right : body.left;
              let tileSide =
                body.num.x > 0
                  ? t.getRight(this.scene.cameras.main)
                  : t.getLeft(this.scene.cameras.main);
              if (side < tileSide) {
                return;
              }
            }*/

            //var gravity = this.scene.physics.world.gravity;
            let completeVelocity = Math.hypot(body.velocity.x, body.velocity.y);
            let absX = completeVelocity * Math.cos(45 * (Math.PI / 180));
            let absY = completeVelocity * Math.sin(45 * (Math.PI / 180));
            let dirY = t.flipX ? dirX : -dirX;
            body.setVelocityX(dirX * absX); // + gravity.x
            isGoingDown && body.setVelocityY(dirY * absY * 2); //+ gravity.y
            //console.log(completeVelocity, dirX * absX, dirY * absY);
        }
    }

    addCollider(sprite, layer) {
        this.sprite = sprite;
        this.layer = layer;

        this.spriteLayerCollider = this.scene.physics.add.collider(
            sprite,
            layer,
            collideCallback,
            processCallback,
            this
        );

        const emitter = this.systems.events;
        //emitter.on("preupdate", this.preUpdate, this);
        emitter.on("update", this.update, this);
        //emitter.on("postupdate", this.postUpdate, this);
    }

    shutdown() {}

    destroy() {
        this.shutdown();
        this.systems.events.off("update", this.update, this);
        this.systems.events.off("boot", this.boot, this);
        this.spriteLayerCollider.destroy();
        this.spriteLayerCollider = undefined;
        this.sprite = undefined;
        this.layer = undefined;
        this.scene = undefined;
        this.systems = undefined;
    }
}
