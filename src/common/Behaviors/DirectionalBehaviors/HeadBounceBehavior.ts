// import {Action, ActionResult} from "../../Actions/Action";
// import Vector2 = Phaser.Math.Vector2;
//
// import Actor from "../../Actors/Actor";
// import {Mixin} from 'ts-mixer';
// import {Behavior, ICardinalDirectionBehavior, TargetableType} from "../Behavior";
// import baseStageScene from "../../BaseStageScene";
// import {CONST_BOUNCE_JUMP_VELOCITY, CONST_GROUND_POUND_VEL, CONST_JUMP_VELOCITY} from "../../Constants";
// import {Attack} from "../../Combat";
// import {GeneratorActionMixin} from "../../Actions/GeneratorActionMixin";
// import {HitScanUtils} from "../../Core/HitScanUtils";
//
//
// class _HeadBounceAction extends Mixin(GeneratorActionMixin, Action) {
//     private hitScanRay: any;
//     constructor(readonly overlapChildren) {
//         super();
//     }
//
//     onStart = () => {
//         this.hero.animStateMachine.setState('head-bounce');
//
//         this.hitScanRay = HitScanUtils.createHitscanRaycast(this.scene, this.actor.x, this.actor.y);
//         //cast patrolCircleRay in all directions
//         this.hitScanRay.setCollisionRange(24);
//         this.hitScanRay.castCircle();
//
//     }
//
//     onComplete = () => {
//         this.hero.animStateMachine.setState('idle');
//     }
//
//     * onGenerate() {
//
//
//         while(this.actorBody.onFloor() === false) {
//
//             //if we've traveling downwards.
//             if(this.actorBody.num.y > 0) {
//
//                 let hitTarget = this.getHitScanRaycastTargets(this.overlapChildren);
//
//                 //we hit something, time to bounce
//                 if(hitTarget.length > 0) {
//                     let hit = new Attack(1).createHit();
//                     hit.perform(null, this.actor, hitTarget[0], {ignoreHitStun: true});
//
//                     let bounceVel = CONST_JUMP_VELOCITY;
//                     if(this.scene.controls.jump.isPressed) {
//                         bounceVel = CONST_BOUNCE_JUMP_VELOCITY
//                     }
//
//                     this.actorBody.setVelocityY(-bounceVel);
//                 }
//
//             }
//
//             yield ActionResult.RUNNING;
//         }
//
//         let canProceed = false;
//
//         while(canProceed === false) {
//             yield ActionResult.RUNNING;
//         }
//
//         return this.succeed();
//     }
//
//     getHitScanRaycastTargets(overlapChildren) {
//         let x = this.actor.x;
//
//         this.hitScanRay.setOrigin(x, this.actor.y);
//         let targets = this.hitScanRay.overlap(overlapChildren);
//         return targets;
//
//     }
//
// }
//
// export default class HeadBounceBehavior extends Behavior implements ICardinalDirectionBehavior {
//
//     canPerform(hero: Actor): boolean {
//         let heroBody = hero.body as Phaser.Physics.Arcade.Body;
//
//         //if we're not on the floor, ceiling, and we're in the air. We can ground pound.
//         return !hero.animStateMachine.isCurrentState('head-bounce') && heroBody.onFloor() === false && heroBody.onCeiling() === false && heroBody.num.y !== 0;
//     }
//
//     getAction(hero: Actor): Action {
//         return new _HeadBounceAction((hero.scene as baseStageScene).enemyCollisionGroup.getChildren());
//     }
//
//     direction: Vector2 = Phaser.Math.Vector2.DOWN;
//
// }
