import { BTreeManager } from "jsxBtree";
import GameManagerSingleton from "./common/GameManagerSingleton";
import {Action, ActionResult} from "./common/Actions/Action";
import List = Phaser.Structs.List;
import {LinkedQueue} from "./common/utils";
import baseStageScene from "./common/BaseStageScene";
import {AddEventParams, Event} from "./common/Event";
import {IEffect} from "./common/Effect";
import Actor from "./common/Actors/Actor";
import Vector2 = Phaser.Math.Vector2;

export class GameExtended extends Phaser.Game {

    get effects(): List<IEffect> {
        return this._effects;
    }
    get cursorSpritePos(): Vector2 {

        let scene = this.scene.getScene(this.gameManager.currentStage) as baseStageScene
        let point = scene.cameras.main.getWorldPoint(this.cursorSprite.x , this.cursorSprite.y)

        return new Vector2(point.x, point.y);
    }


    manualCursorControl: Boolean;
    BTreeManager: BTreeManager;
    private _effects: List<IEffect> = new List<IEffect>(null);

    constructor(props) {
        super(props);
        this.gameManager = GameManagerSingleton.getInstance(this)
        this.BTreeManager = BTreeManager.getInstance();

        this.manualCursorControl = false;

        // this.events.on('prerender', function () {
        //     // @ts-ignore
        //     window.stats?.begin();
        //     // @ts-ignore
        //     window.stats?.begin('render', '#6cc644')
        // });
        //
        // this.events.on('postrender', function () {
        //     // @ts-ignore
        //     window.stats?.end('render')
        //
        //     // @ts-ignore
        //     window.stats?.end();
        //
        // });

    }

    get queuedIteratorActions(): LinkedQueue<Action> {
        return this._queuedIteratorActions;
    }

    private _queuedIteratorActions : LinkedQueue<Action> = new LinkedQueue<Action>();
    private _actions : LinkedQueue<Action> = new LinkedQueue<Action>();
    private _reactions: LinkedQueue<Action> = new LinkedQueue<Action>();
    private _events : List<Event> = new List<Event>(null);

    get actions() {
        return this._actions;
    }

    addEvent(args : AddEventParams) : void {
        this._events.add(new Event(args));
    }

    cursorSprite: Phaser.GameObjects.Sprite;

    updateGameQueue(): GameResult {

        let madeProgress = false;

        while(this.queuedIteratorActions.getLength() > 0){

            const dequeudedIteratorAction = this.queuedIteratorActions.dequeue();
            this.actions.add(dequeudedIteratorAction.value);
        }


        //TODO: this needs to be replaced with a proper implementation
        let scene = this.scene.getScene(this.gameManager.currentStage) as baseStageScene //this.gameManager.getCurrentScene();

        for (const actor of scene.actors) {

            let action = actor.getAction();
            if(action) {
                this.actions.add(action);
            }

        }


        let tmp = this.actions.getOrderedList();
        this.actions.clear();

        //sort the actions by priority and the re-insert them into the list.
        tmp.sort((a, b) => b.value.priority - a.value.priority )
            .forEach(item => {
                this.addAction(item.value);
            });

        this._updateEffectsLifespan();

        while (this._actions.getLength() > 0) {

            let action = this._actions.first().value;

            let result = action.perform();

            // Cascade through the alternates until we hit bottom.
            // while (result.alternative) {
            //
            //     this._actions.dequeue();
            //     action = result.alternative;
            //     this._actions.addToFront(action);
            //     result = action.perform();
            //
            //     //note: fixes weird bug that happens when the iterator queue still has the iterator action from before.
            //     if(this._queuedIteratorActions.contains(action))
            //         this._queuedIteratorActions.remove(action);
            // }

            while (this._reactions.getLength() > 0) {
                let reaction = this._reactions.removeLast().value;
                result = reaction.perform();

                // Cascade through the alternates until we hit bottom.
                // while (result.alternative != null) {
                //     reaction = result.alternative;
                //     result = reaction.perform();
                // }

                //assert(result.succeeded, "Reactions should never fail.");
            }

            //handle multi-beat actions
            if(ActionResult.is(result, ActionResult.RUNNING)) {
                //add to back of queue
                const dequeuedIterator = this._actions.dequeue();
                // if((dequeuedIterator.value as GeneratorActionMixin).currentStep === 1) {
                //     //dequeuedIterator.value.actor.energy.spend();
                // }

                this._queuedIteratorActions.add(dequeuedIterator.value);
                //continue;
            }


            //battleScreen.refreshView();
            madeProgress = true;

            if (result.done) {
                this._actions.dequeue();

                if (result.succeeded) {
                    action.actor.finishTurn(action);
                }

            }

            if (this._events.length > 0) return this.makeResult(madeProgress);
        }

        return this.makeResult(madeProgress);

    }

    private _updateEffectsLifespan() {
        this._effects.each((effect) => {
            if(!effect.updateLife()) {
                this._effects.remove(effect);
                effect.destroy();
            }
        });
    }

    makeResult(madeProgress : boolean) : GameResult  {
        let result = new GameResult(madeProgress);
        result.events = new List<Event>(null);
        this._events.each((event) => {
            result.events.add(event);
        });

        this._events.shutdown();
        return result;
    }

    addAction(action : Action, addToFront? : boolean) {
        if (action?.isImmediate) {
            this._reactions.add(action);
        } else {
            if(addToFront) {
                this._actions.addToFront(action);
            }
            else
                this._actions.add(action);
        }
    }

    removeActionsForActor(actor: Actor) {
        this._actions.forEach((action, index) => {
            (action.value.actor === actor) && this._actions.remove(action.value);
        });
        this._queuedIteratorActions.forEach((action, index) => {
            (action.value.actor === actor) && this._queuedIteratorActions.remove(action.value);
        });
        this._reactions.forEach((action, index) => {
            (action.value.actor === actor) && this._reactions.remove(action.value);
        })
    }

    gameManager: GameManagerSingleton
}

export class GameResult {
    /// The "interesting" events that occurred in this update.
    events : List<Event>;

    /// Whether or not any game state has changed. If this is `false`, then no
    /// game processing has occurred (i.e. the game is stuck waiting for user
    /// input for the [Hero]).
    madeProgress : boolean;

    /// Returns `true` if the game state has progressed to the point that a change
    /// should be shown to the user.
    get needsRefresh(){
        return this.madeProgress;// || events.length > 0;
    }

    constructor(madeProgress) {
        this.madeProgress = madeProgress;
    };
}
