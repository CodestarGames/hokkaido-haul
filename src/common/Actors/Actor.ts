import {Action} from "../Actions/Action";
import {GameExtended} from "../../gameExtended";
import baseStageScene from "../BaseStageScene";
import {Hit, HitType} from "../Combat";
import {EventType} from "../Event";
import {StateMachine} from "../StateMachine";
import Vector2 = Phaser.Math.Vector2;
import List = Phaser.Structs.List;

export default abstract class Actor extends Phaser.GameObjects.Sprite {
    health: number = 12;
    hitStun: Boolean = false;

    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
        super(scene, x ?? 0, y ?? 0, texture || "player-idle", frame ?? 0);
        (scene as baseStageScene).addActor(this);

        this.invulnerable = false;
        this.isAlive = true;
        this.hangingOnTarget = null;
    }

    animStateMachine: StateMachine

    isTargeted : boolean = false;
    isAlive: boolean;
    invulnerable: boolean;
    hangingOnTarget: Phaser.GameObjects.Sprite;
    launchable: boolean = false;

    get pos(): Phaser.Math.Vector2 {
        return new Vector2(this.x, this.y);
    }

    get game(): GameExtended {
        return this.scene.game as GameExtended;
    }

    get needsInput() : boolean { return false; }

    public name: string;

    public getAction () : Action {
        if(!this.active)
            return null;

        const action = this.onGetAction();
        if (action != null) action.bind(this);
        return action;
    }

    abstract onGetAction (): Action;



    /// Called when this Actor has completed a turn.
    onFinishTurn( action : Action) {
        // Do nothing.
    }

    finishTurn(action : Action) {
        //if (action.actor.isAlive)
            this.onFinishTurn(action);
    }

    onGiveDamage(action: Action, defender: Actor, damage: number) {

    }

    //return if defender dies
    takeDamage(action: Action, damage: number, attacker: Actor) {
        let scene  = this.scene as baseStageScene;
        this.health -= damage;

        let pos = this.getTopCenter();
        pos.y -= 16;
        this.game.addEvent({
            type: EventType.text,
            actor: this,
            element: null,
            pos,
            dir: null,
            options: {text: "+$1000"}
        });

        this.game.gameManager.score += 1000;

        if(this.health <= 0)
            this.isAlive = false;

        if (this.isAlive) return false;

        this.onDied();

        return true;
    }

    /// Create a new [Hit] for this [Actor] to attempt to hit [defender].
    ///
    /// Note that [defender] may be null if this hit is being created for
    /// something like a bolt attack or whether the targeted actor isn't known.
    createMeleeHits(defender : Actor) : List<Hit> {
        let hits = this.onCreateMeleeHits(defender);
        hits.each(hit => this.modifyHit(hit, HitType.melee));
        return hits;
    }

    abstract onCreateMeleeHits(defender : Actor) : List<Hit>

    /// Applies the hit modifications from the actor.
    modifyHit(hit : Hit, type : HitType) {

        // Let the subclass also modify it.
        this.onModifyHit(hit, type);
    }

    onModifyHit(hit : Hit, type : HitType) {

    }

    onDied() {
        this.game.removeActionsForActor(this);
        (this.scene as baseStageScene).removeActor(this);
        
    }
}

