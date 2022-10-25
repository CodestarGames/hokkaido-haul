import {GameExtended} from "../gameExtended";
import {Event, EventType} from "./Event";
import Vector2 = Phaser.Math.Vector2;
import Actor from "./Actors/Actor";
import baseStageScene from "./BaseStageScene";
import {Element} from "./Core/Element";


export interface IEffect {
    updateLife() : boolean;
    destroy(): void
}

export const elementAnimDefs = (screen: Screen) => ({
    cold: [{
        key: `effect-hurt`,
        config: { frames: [0, 1, 2, 3] },
        repeat: 0
    }]
});

export const addEffects = (game: GameExtended,  event: Event) => {

    switch (event.type) {
        case EventType.text:
            game.effects.add(new TextEffect(event.actor, event.element, event.pos, event.options));
            break;

        case EventType.hurt:
            game.effects.add(new AnimationEffect(event.actor.scene, 'impact', 'effect-impact', event.pos, {depth:10000000}));
            break;
    }
}

class AnimationEffect extends Phaser.GameObjects.Sprite implements IEffect {
    life : number = 1;
    game: GameExtended;
    constructor(scene: Phaser.Scene, spritesheetKey: string, animKey: string, pos: Vector2, options: any){
        super(scene, pos.x, pos.y, spritesheetKey);
        this.game = scene.game as GameExtended;
        Object.assign(this, options);
        scene.add.existing(this);

        this.anims.play(animKey);
        this.on('animationcomplete',() => this.destroy(), this);
    }

    updateLife(...args): boolean {
        this.life--;
        return this.life > 0;
    }

}


class TextEffect extends Phaser.GameObjects.BitmapText implements IEffect {
    life : number = 64;
    damage: number;
    element: Element;
    actor: Actor;

    constructor(actor : Actor, element: Element, pos: Vector2, {text}) {
        super(actor.scene, pos.x ?? actor.x, pos.y ?? actor.y, "pixel", text.toString());

        this.scaleX = 2;
        this.scaleY = 2.5;
        this.setOrigin(0.5, 1);
        this.tintFill = true;
        this.tintTopLeft = 11067555;
        this.tintTopRight = 11067555;
        this.tintBottomLeft = 11067555;
        this.tintBottomRight = 11067555;
        this.text = text.toString();
        this.fontSize = 8;
        this.dropShadowX = 1;
        this.dropShadowY = -1;
        this.dropShadowAlpha = 1;

        this.actor = actor;
        this.element = element;
        this.damage = text;

        this.actor.scene.add.existing(this);
        this.actor.scene.children.bringToTop(this);

        this.scene.tweens.add({
            targets: [this],
            y: "-=16",
            duration: 100
        })

    }

    updateLife(...args) : boolean {
        this.life--;
        return this.life > 0;
    }

}

