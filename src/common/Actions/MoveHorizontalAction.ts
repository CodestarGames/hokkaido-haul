import {Action, ActionResult} from "./Action";

export class MoveHorizontalAction extends Action {
    constructor(readonly dir: number, readonly velocity: number) {
        super();
    }

    onPerform(): ActionResult {
        let body = this.actor.body as Phaser.Physics.Arcade.Body;
        switch (this.dir) {
            case Phaser.LEFT:
                body.setVelocityX(-this.velocity);
                break;
            case Phaser.RIGHT:
                body.setVelocityX(this.velocity);
                break;
        }


        return this.succeed();
    }
}


