import {HeroType} from "./HeroType";

export class DefaultHeroType extends HeroType {

    name = 'player-van'
    bodySize: {w: number, h: number} = {w: 80, h:98}
    bodySizeSm: {w: number, h: number} = {w: 80, h:55}
    jumpVel = 520
}

export class IronmouseHeroType extends HeroType {

    name = 'ironmouse'
    bodySize: {w: number, h: number} = {w: 68, h:102}
    bodySizeSm: {w: number, h: number} = {w: 80, h:64}
    jumpVel = 580

}
