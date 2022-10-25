import {Action, ActionResult} from "../../Actions/Action";
import {Mixin} from 'ts-mixer';
import {CONST_JUMP_VELOCITY} from "../../Constants";
import {Behavior} from "../Behavior";
import Hero from "../../Actors/Hero/Hero";
import {GeneratorActionMixin} from "../../Actions/GeneratorActionMixin";

export class _JumpAction extends Mixin(GeneratorActionMixin, Action) {

    get isImmediate(): boolean {
        return false;
    }

    onStart = () => {

    }

    onComplete = () => {
        let body = this.actor.body as Phaser.Physics.Arcade.Body;
    }

    * onGenerate() {
        let body = this.actor.body as Phaser.Physics.Arcade.Body;

        while(true) {

            if(body.onCeiling()) {
                body.setVelocityY(10);
                this.hero.animStateMachine.setState('fall');
                break;
            }

            if(this.hero.jumpStep === 0)
                break;

            if (this.scene.controls.jump.isPressed && (this.hero.jumpStep !== 0)) {//hero is no longer on the ground, but is still holding the jump key
                if (this.hero.jumpStep > 15) { // hero has been holding jump for over 15 frames, it's time to stop him
                    this.hero.jumpStep = 0;
                    //this.hero.animStateMachine.setState('fall');
                } else {
                    // hero is allowed to jump higher (not yet 15 frames of jumping)
                    this.hero.jumpStep++;
                    this.actor.body.velocity.y = -CONST_JUMP_VELOCITY;
                    yield ActionResult.RUNNING;
                }
            } else if (this.hero.jumpStep !== 0) { //reset jumpStep since the hero is no longer holding the jump key
                this.hero.jumpStep = 0;
                break;
            }

        }


        return this.succeed();
    }
}

export class JumpBehavior extends Behavior {
    canPerform(hero: Hero): boolean {
        return hero.jumpStep !== 0;
    }

    getAction(hero: Hero): Action {
        return new _JumpAction();
    }

}

