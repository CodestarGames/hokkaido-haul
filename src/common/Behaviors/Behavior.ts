import Vector2 = Phaser.Math.Vector2;
import {Action} from "../Actions/Action";
import Hero from "../Actors/Hero/Hero";
import Actor from "../Actors/Actor";

export abstract class Behavior {
    //NOTE: BEHAVIORS WILL CONTINUE TO SPIT OUT THE SAME ACTIONS IF YOU GIVE IT AN ITERABLE ACTION AND THIS CHECK PASSES
    abstract canPerform (hero : Hero) : boolean;
    abstract getAction (hero: Hero) : Action;
    alternate: Behavior;
}

/// A simple one-shot behavior that performs a given [Action] and then reverts
/// back to waiting for input.
export class ActionBehavior extends Behavior {
    action : Action;

    constructor(action : Action){
        super();
        this.action = action;
    }

    canPerform = ( hero: Hero) => true;

    getAction( hero: Hero) : Action {

        hero.cancelCurrentBehavior();
        return this.action;
    }
}

export type TargetableType = Actor | Phaser.Types.Math.Vector2Like;

export interface ITargetBehavior {
    target: TargetableType
}

export interface ICardinalDirectionBehavior {
    direction: Vector2
}

export interface IPassiveBehavior {

}
