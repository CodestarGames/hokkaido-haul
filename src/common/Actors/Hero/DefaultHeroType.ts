import {HeroType} from "./HeroType";

export class DefaultHeroType extends HeroType {

    name = 'player-van'
    bodySize: {w: number, h: number} = {w: 60, h:98}
    bodySizeSm: {w: number, h: number} = {w: 60, h:55}
    jumpVel = 600
}

export class IronmouseHeroType extends HeroType {

    name = 'ironmouse'
    bodySize: {w: number, h: number} = {w: 60, h:106}
    bodySizeSm: {w: number, h: number} = {w: 60, h:64}
    jumpVel = 580

}
//
// export class PeteHeroType extends HeroType {
//
//     name = 'pete'
//     bodySize: {w: number, h: number} = {w: 32, h:48}
//     bodySizeSm: {w: number, h: number} = {w: 0, h:32}
//     jumpVel = 580
//
// }
