import {Behavior} from "../../Behaviors/Behavior";

export abstract class HeroType {

    name = 'player'

    getFormattedAnimName(animName: string) {
        return `anim-${this.name}-${animName}`;
    }
}


