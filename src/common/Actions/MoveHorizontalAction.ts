import {Action, ActionResult} from "./Action";
import {GAME_SCENE_STATE} from "../GameManagerSingleton";

export class MoveHorizontalAction extends Action {
    constructor(readonly dir: number, readonly num: number) {
        super();
    }

    onPerform(): ActionResult {
        if(this.game.gameManager.currentGameState !== GAME_SCENE_STATE.GAME_SCROLL)
            return this.fail();

        switch (this.dir) {
            case Phaser.LEFT:
                Phaser.Actions.IncX([this.actor], -this.num);
                break;
            case Phaser.RIGHT:
                Phaser.Actions.IncX([this.actor], this.num);
                break;
        }


        return this.succeed();
    }
}


