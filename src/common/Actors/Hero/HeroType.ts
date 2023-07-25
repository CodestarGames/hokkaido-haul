import {Behavior} from "../../Behaviors/Behavior";

export abstract class HeroType {

    name = 'player'

    bodySize: {w: number, h: number}
    bodySizeSm: {w: number, h: number}
    jumpVel: number

    getFormattedAnimName(animName: string) {
        return `anim-${this.name}-${animName}`;
    }
}


