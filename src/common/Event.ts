import Actor from "./Actors/Actor";
import Vector2 = Phaser.Math.Vector2;
import {Element} from "./Core/Element";

export interface AddEventParams {
    type: EventType;
    actor?: Actor;
    scene?: Phaser.Scene;
    element?: Element;
    pos?: any;
    dir?: Phaser.Math.Vector2;
    options?: any;
}

export class Event {
    type: EventType;
    actor: Actor;
    element: Element;
    options: any;
    pos: any;
    dir: Vector2;
    scene: Phaser.Scene;

    constructor({type, scene, actor, element, pos, dir, options}: AddEventParams) {
        this.type = type;
        this.scene = scene;
        this.actor = actor;
        this.element = element || Element.none;
        this.pos = pos;
        this.dir = dir;
        this.options = options;
    }
}

/// A kind of [Event] that has occurred.
export class EventType {

    static movementDust = new EventType("movementDust");

    /// An [Actor] was hit.
    static text = new EventType("text");

    /// An [Actor] was hurt.
    static hurt = new EventType("hurt");
    static headBop = new EventType("headBop");
    static paintSplat = new EventType("paintSplat");

    static rope = new EventType("rope");

    static crosshair = new EventType("crosshair");

    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    toString() {
        return this._name;
    }
}
