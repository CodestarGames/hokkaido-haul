import React from 'react';
import {StateMachine} from "../../StateMachine";
import Hero from "./Hero";
import baseStageScene from "../../BaseStageScene";
import {CONST_BOUNCE_JUMP_VELOCITY, CONST_GROUND_POUND_VEL} from "../../Constants";
import PlayScene from "../../../PlayScene";


export function HeroStateMachine(props) {

    let hero = props.context as Hero;
    let scene = hero.scene as PlayScene;

    let speed = 170 ///hero movement speed;
    let getHeroBody =() => hero.body as Phaser.Physics.Arcade.Body;

    let machine = new StateMachine(props.context, props.name);
    machine.addState('idle', {
        onEnter() {
            hero.angle = 0;
            hero.play(hero.getFormattedAnimName('idle'), true);
        },
        update() {

            if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                hero.animStateMachine.setState('fall');
            }

            if(scene.dialogBox.visible)
                return;

            if (scene.controls.left.isPressed || scene.controls.right.isPressed)
                hero.animStateMachine.setState('run');

            if (!scene.controls.left.isPressed && !scene.controls.right.isPressed)
                getHeroBody().setVelocityX(0);

            if (scene.controls.down.isPressed === true)
                hero.animStateMachine.setState('crouch');


            if (scene.controls.jump.isPressed) {
                hero.jump();
            }

            return undefined;

        },
        onExit() {
            //hero.stop();
        }
    })
        .addState('run', {
            onEnter() {
                hero.angle = 0;
                hero.play(hero.getFormattedAnimName('idle'), true);
            },
            update() {

                if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                    hero.animStateMachine.setState('fall');
                    return undefined;
                }

                if (scene.controls.jump.isPressed) {
                    hero.jump();
                    return undefined;
                }


                if (scene.controls.left.isPressed) {
                    getHeroBody().setVelocityX(-speed);
                    return undefined;
                }

                if (scene.controls.right.isPressed) {
                    hero.flipX = false;
                    getHeroBody().setVelocityX(speed);

                    return undefined;
                }

                if (Date.now() - scene.controls.right.lastPressedAt > 150)
                    hero.animStateMachine.setState('idle');

                return undefined;

            },
            onExit() {
                //player.stop()
            }
        })
        .addState('jump', {
            onEnter() {
                console.log('beginjump')
                scene.sound.play("jump", {volume: 0.4})

                // if (heroBody.velocity.y === 0) {
                //     //we are in a snug little corner where we can't jump
                //     if (hero.anims.currentAnim.key === hero.getFormattedAnimName('jump')) {
                //         hero.animStateMachine.setState('fall');
                //         return;
                //     }
                //     heroBody.setVelocityY(-240);
                // }

                if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                    hero.animStateMachine.setState('fall');
                    return;
                }

                hero.angle = -2;

                hero.play(hero.getFormattedAnimName('idle'), true);
                hero.jumpStep = 1;
            },
            update() {

                if (getHeroBody().onCeiling()) {
                    hero.animStateMachine.setState('fall');
                }

                if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                    hero.animStateMachine.setState('fall');
                }

                if (getHeroBody().onFloor() && getHeroBody().velocity.y === 0) {

                    hero.animStateMachine.setState('idle');
                    return;
                }

                // if (scene.controls.jump.isPressed) {
                //     hero.airJumpDownInputBehavior();
                //     return undefined;
                // }

                //
                // if (scene.controls.jump.isPressed && Date.now() - scene.controls.jump.lastPressedAt < 750) {
                //     hero.airJumpUpInputBehavior();
                //     return undefined;
                // }

                if (scene.controls.left.isPressed) {
                    getHeroBody().setVelocityX(-speed);
                    return undefined;
                }

                if (scene.controls.right.isPressed) {
                    hero.flipX = false;
                    getHeroBody().setVelocityX(speed);
                    return undefined;
                }

                return undefined;

            },
            onExit(){
                hero.angle = 0;
            }
        })
        .addState('fall', {
            onEnter() {
                hero.angle = 2;
                hero.play(hero.getFormattedAnimName('idle'), true);
            },
            update() {
                if (getHeroBody().onFloor()) {
                    getHeroBody().setVelocityX(0);
                    hero.animStateMachine.setState('idle')
                } else {
                    if (getHeroBody().velocity.y === 0) {
                        getHeroBody().setVelocityY(10);
                    }
                }

                if (scene.controls.left.isPressed) {
                    getHeroBody().setVelocityX(-speed);
                } else if (scene.controls.right.isPressed) {
                    hero.flipX = false;
                    getHeroBody().setVelocityX(speed);
                }

                return undefined;
            },
            onExit(){
                hero.angle = 0;
                scene.sound.play("land", {volume: 0.4})
                scene.cameras.main.shake(120, 0.002, null, () => {});
            }
        })
        .addState('crouch', {
            onEnter() {
                hero.angle = 0;
                hero.play(hero.getFormattedAnimName('crouch'), true);

                //half body size
                getHeroBody().setSize(80, 55).setOffset(0, 42);
            },
            update() {

                if(scene.dialogBox.visible)
                    hero.animStateMachine.setState('idle');

                if (scene.controls.down.isPressed === false) {
                    hero.animStateMachine.setState('idle')
                }
                //
                // if (scene.controls.left.isPressed) {
                //     getHeroBody().setVelocityX(-speed);
                //     return undefined;
                // }
                //
                // if (scene.controls.right.isPressed) {
                //     hero.flipX = false;
                //     getHeroBody().setVelocityX(speed);
                //     return undefined;
                // }

                getHeroBody().setVelocityX(0);

                return undefined;
            },
            onExit(){
                hero.angle = 0;
                getHeroBody().setVelocityX(0);
                //reset body size
                getHeroBody().setSize(80, 98).setOffset(0, 0);
            }
        })
        .addState('hurt', {
            onEnter() {
                getHeroBody().setVelocityY(-CONST_BOUNCE_JUMP_VELOCITY * 1.75);
                scene.gameManager.gameSpeed = 1;
                scene.gameManager.energy = 0;
                hero.hitStun = true;
                hero.setAlpha(0.5);
                let interv = setInterval(() => {
                    hero.alpha === 0.5 ? hero.setAlpha(1) : hero.setAlpha(.5);
                }, 100);

                scene.time.delayedCall(2000, () => {
                    clearInterval(interv);
                    hero.setAlpha(1);
                    hero.hitStun = false;
                    hero.animStateMachine.setState('idle');
                })
            },
            update() {
                if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                    hero.animStateMachine.setState('fall');
                    return undefined;
                }

                if (scene.controls.jump.isPressed) {
                    hero.jump();
                    return undefined;
                }


                if (scene.controls.left.isPressed) {
                    getHeroBody().setVelocityX(-speed);
                    return undefined;
                }

                if (scene.controls.right.isPressed) {
                    hero.flipX = false;
                    getHeroBody().setVelocityX(speed);
                    return undefined;
                }

                return undefined;
            },
            onExit(){
                hero.angle = 0;
            }
        })
        .addState('died', {
            onEnter() {

            },
            update() {

                return undefined;
            },
            onExit(){
                hero.angle = 0;
            }
        })

    return machine;
}
