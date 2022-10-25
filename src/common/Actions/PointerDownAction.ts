import {Action, ActionResult} from "./Action";
import Actor from "../Actors/Actor";
import {Mixin} from 'ts-mixer';
import {GeneratorActionMixin} from "./GeneratorActionMixin";

export class PointerDownAction extends Mixin(GeneratorActionMixin, Action) {
    private clickStartedAt: number;
    private holdDuration: number;
    private holdDurationLength: number = 300;
    executionUUID: string;

    get isRightClickDown() {
        return this.pointer.rightButtonDown();
    }

    constructor(readonly pointer: Phaser.Input.Pointer, readonly targetGameObjects: Actor[]) {
        super();
        this.holdDuration = 0;
    }

    onStart = () => {
        this.clickStartedAt = Date.now();
    }

    * onGenerate() {

        let target = this.targetGameObjects.length > 0 ? this.targetGameObjects[0] : undefined;


        //handle click outside of interactive object
        while(this.holdDuration < this.holdDurationLength) {

            if(this.scene.input.activePointer.isDown && this.isRightClickDown === false) {
                if(Date.now() - this.clickStartedAt >= this.holdDurationLength){
                    this.holdDuration = Date.now() - this.clickStartedAt;
                    break;
                }

                yield ActionResult.RUNNING;
            }
            else {
                this.holdDuration = Date.now() - this.clickStartedAt;
                break;
            }
        }

        if(this.holdDuration >= this.holdDurationLength) {
            if(!target) {
                //we've not clicked anything, so prepare to launch a paint ball

                //Set cursor tint
                this.game.cursorSprite.setFrame(1).setOrigin(.5);
                this.hero.setTint(0x00FF00);

                this.hero.shotCharged = true;
                this.hero.drawAimLine = true;
                this.succeed();
            }
            else {

                //if(target instanceof BaseEnemy) {
                if(target){
                    //we've clicked something, let's prepare to launch it.

                    return this.succeed();
                }


            }
        }
        else {
            //fly to a target if we just clicked on it shortly
            if(target) {
                //TODO: this needs to be fixed, this action needs a priority higher than the movement action
                this.hero.animStateMachine.setState('fly-to-target');

                return this.succeed()
            }
        }


        return this.fail();
    }

}
