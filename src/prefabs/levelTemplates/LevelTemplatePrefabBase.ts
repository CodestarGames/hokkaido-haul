import EnemyBase from "../../common/Actors/Enemy/EnemyBase";
import overpassColumnPrefab from "../overpassColumnPrefab";

export default abstract class LevelTemplatePrefabBase extends Phaser.GameObjects.Container {
    abstract parentLayer: Phaser.GameObjects.Layer;

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.registerCollisionGroup, this);
    }


    awake(){

        while(this.list.length !== 0){
            let child: any = this.first
            let c = this.scene.add.existing(child);
            c.x += (this.x);
            c.y += this.y;

            this.remove(child);
            this.parentLayer.add(child);
        }



        this.destroy();
    }

    registerCollisionGroup() {
        this.parentLayer.list.forEach(child => {
            if(child instanceof Phaser.GameObjects.Rectangle) {
                (this.parentLayer.scene as any).templateBoundsGroup.add(child);
            }
            else if(!(child instanceof EnemyBase) && !(child instanceof overpassColumnPrefab)) {
                (this.parentLayer.scene as any).staticPhysicsItemsGroup.add(child);
            }
        });
    }

}
