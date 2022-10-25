import baseStageScene from "../BaseStageScene";

export class HitScanUtils {

    static createHitscanRaycast(scene: baseStageScene, x, y) {

        let hitScanRay = scene.raycaster.createRay({
            origin: {
                x,
                y
            },
            //set detection range
            autoSlice: true,  //automatically slice casting result into triangles
            collisionRange: 24 //field of view range
        });
        hitScanRay.enablePhysics();

        return hitScanRay;
    }
}
