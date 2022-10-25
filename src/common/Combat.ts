import {Action} from "./Actions/Action";
import Actor from "./Actors/Actor";

export class Attack {

    damage : number;
    range : number;
    element : any;

    constructor(damage, range?, element? : any) {
        this.damage = damage;
        this.element = element;
        this.range = range || 0;

    }

    get isRanged() { return this.range > 0; }

    createHit() : Hit { return new Hit(this); }

}

export enum HitType { melee, ranged, toss }

export class Hit {

    _attack : Attack;
    private canMiss: boolean;
    private _knockback: number = 0;


    get element() : any {
        return this._attack.element;
    }

    constructor (_attack) {
        this._attack = _attack;
    };

    /// Performs a melee [Hit] from [attacker] to [defender]
    perform(action : Action , attacker : Actor , defender : Actor , options? : {canMiss?: boolean, ignoreHitStun: boolean }) : number {
        this.canMiss = options && options.canMiss || true;

        if(options?.ignoreHitStun) {
            defender.hitStun = false;
        }

        let damage = this._attack.damage;

        if (attacker != null) {
            attacker.onGiveDamage(action, defender, damage);
        }

        if(defender.hitStun === true) {
            return 0;
        }

        this.handleKnockback(attacker, defender);
        defender.takeDamage(action, damage, attacker)


        return damage;
    }


    addKnockback(num: number) {
        this._knockback = num;
    }

    private handleKnockback(attacker: Actor, defender: Actor) {
        if (this._knockback > 0) {
            //TODO: knockback is something that needs to be applied at the actor level.
            let body = defender.body as Phaser.Physics.Arcade.Body;
            let x = defender.flipX === true ? -80 : 80;
            body.setVelocity(x, -80 * this._knockback);
        }
    }
}

