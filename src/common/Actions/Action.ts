import {NodeState} from "jsxBtree";
import {GameExtended} from "../../gameExtended";
import Actor from "../Actors/Actor";
import Hero from "../Actors/Hero/Hero";
import baseStageScene from "../BaseStageScene";
import {createUid} from "../utils";

export abstract class Action {

    priority: number = 1;

    /// Whether this action can be immediately performed in the middle of an
    /// ongoing action or should wait until the current action is finished.
    get isImmediate(): boolean {
        return false;
    }

    get scene(): baseStageScene {
        return this._scene as baseStageScene;
    }

    get game(): GameExtended {
        return this._scene.game as GameExtended;
    }

    get hero(): Hero {
        return (this.scene as baseStageScene).hero as Hero;
    }

    get actor(): Actor {
        return this._actor;
    }

    get actorBody(): Phaser.Physics.Arcade.Body {
        return this._actor.body as Phaser.Physics.Arcade.Body;
    }
    protected _scene: Phaser.Scene;
    protected _isImmediate: boolean;
    private _actor: Actor;
    executionUUID: string;


    public bind(bindTarget: Actor) {
        this._bind(bindTarget);
    }

    private _bind(bindTarget: Actor) {
        this._actor = bindTarget;
        this._scene = bindTarget.scene;
        this.executionUUID = createUid();
    }

    public perform(): ActionResult {
        if (!this.actor)
            return this.fail();


        let res = this.onPerform();
        return res;
    }

    onPerform(): ActionResult {
        return null;
    };

    /// Enqueue a secondary action that is a consequence of this one.
    ///
    /// If [action] is immediate (`isImmediate` returns true), then the action
    /// will be performed in the current tick before the current action continues
    /// to process. Otherwise, it will be enqueued and run once the current action
    /// and any other enqueued actions are done.
    public addAction(action: Action, actor: Actor) {
        action._bind(actor || this._actor);
        this.game.addAction(action);
    }

    // addEvent(args: AddEventParams): void {
    //     this.game.addEvent(args);
    // }


    public succeed(): ActionResult {
        return ActionResult.SUCCEEDED;
    }

    public fail(): ActionResult {
        return ActionResult.FAILED;
    }

    //NOTE: These are evil cascading demons, uncomment when you feel like fixing them.
    // alternate(action: Action): ActionResult {
    //     action.bind(this._actor);
    //     return ActionResult.alternate(action);
    // }

    /// Returns [success] if [done] is `true`, otherwise returns [notDone].
    doneIf(done: boolean): ActionResult {
        return done ? ActionResult.SUCCEEDED : ActionResult.RUNNING;
    }


}



export class ActionResult extends NodeState {
    static SUCCEEDED = new ActionResult({succeeded: true, done: true});
    static FAILED = new ActionResult({succeeded: false, done: true});
    static RUNNING = new ActionResult({succeeded: true, done: false});
    static READY = new ActionResult({succeeded: false, done: false});

    static is(value: ActionResult, state: ActionResult) {
        return state.done === value.done && state.succeeded === value.succeeded;
    }

    // alternative: Action;
    // static alternate(action: Action) {
    //     const returnVal = ActionResult.FAILED;
    //     returnVal.alternative = action;
    //     return returnVal;
    // }
}
