import {Action} from "../Actions/Action";
import {Hit} from "../Combat";
import Vector2 = Phaser.Math.Vector2;

type AttackFunction = (damage: number) => Action;
type FloorActionFunction = (pos : Vector2, hit : Hit, distance : number, fuel: number) => Action;

export class Element {
    static none = new Element("none", "No");
    name : string;

    /// Creates a side-effect action to perform when an [Attack] of this element
    /// hits an actor for [damage] or `null` if this element has no side effect.
    attackAction : AttackFunction;

    /// Creates a side-effect action to perform when an area attack of this
    /// element hits a tile or `null` if this element has no effect.
    floorAction : FloorActionFunction;

    /// The multiplier to experience gained when killing a monster with a move or
    /// attack using this element.
    readonly experience : number;

    constructor(name, experience, attackAction? : AttackFunction, floorAction?: FloorActionFunction) {
        this.name = name;
        this.attackAction = attackAction;
        this.floorAction = floorAction;
        this.experience = experience;

    }

    toString(){ return this.name }
}
