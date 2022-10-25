/*
* Noting Idea here, paint ability can be gotten from using the eye dropper tool on an enemy.
* Paint will require you to get the color from an enemy until you find the palette color of that color.
* After you acquire the palette color, you can use that paint color infinitely
* Perhaps the paint color stays equipped until you take damage and it gets knocked loose like in Kirby
* The amount of damage determines if you lose your ability or not.
* Perhaps the ability will bounce around when it's lost like kirby's?
*
* Or perhaps we have the abilities work like megaman ones?
* still not sure.
* */

export enum PAINT_COLORS {
    RED = "red",
    ORANGE = "orange",
    YELLOW = "yellow",
    GREEN = "green",
    BLUE = "blue",
    INDIGO = "indigo",
    VIOLET = "violet",
    // BLACK = "black",
    // WHITE = "white",
    NONE = "none"
}

export const CONST_HERO_PUNCH_DAMAGE = 1;
export const CONST_ENEMY_MELEE_DISTANCE = 64;
export const CONST_GROUND_POUND_VEL = 420;
export const CONST_JUMP_VELOCITY = 520;
export const CONST_BOUNCE_JUMP_VELOCITY = 400;
export const CONST_AIR_UP_VELOCITY = 200;
export const CONST_RUSH_VELOCITY_X = 380;
export const CONST_MAX_GAME_SPEED = 6;
