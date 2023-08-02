import React from 'react';
import {StateMachine} from "../../StateMachine";
import Hero from "./Hero";
import {CONST_BOUNCE_JUMP_VELOCITY} from "../../Constants";
import PlayScene from "../../../PlayScene";
import {DefaultHeroType, IronmouseHeroType} from "./DefaultHeroType";


export function HeroStateMachine(props) {

    let hero = props.context as Hero;
    let scene = hero.scene as PlayScene;

    let speed = 170 ///hero movement speed;
    let getHeroBody =() => hero.body as Phaser.Physics.Arcade.Body;

    let machine = new StateMachine(props.context, props.name);
    machine
    .addState('idle', {
        onEnter() {
            hero.angle = 0;
            if(hero.hitStun === false)
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
            if(hero.hitStun === false)
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
        .addState('dash', {
            onEnter() {
                hero.angle = 0;
                scene.sound.play("sfx-van-dash", {volume: 0.4})
                if(hero.hitStun === false)
                    hero.play(hero.getFormattedAnimName('idle'), true);
                scene.time.delayedCall(350, () => {
                    hero.animStateMachine.setState('fall');
                })
            },
            update() {
                hero.jumpStep = 0;
                getHeroBody().setVelocity(400, -60);
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

            // if (heroBody.num.y === 0) {
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
            if(hero.hitStun === false)
                hero.play(hero.getFormattedAnimName('jump'), true);
            hero.jumpStep = 1;
        },
        update() {

            if (getHeroBody().onCeiling()) {
                hero.animStateMachine.setState('fall');
            }

            // if(hero.heroType instanceof DefaultHeroType) {
            //     if(scene.controls.jump.isPressed && !getHeroBody().onFloor() && (Date.now() - scene.controls.jump.lastPressedAt > 400)) {
            //         hero.animStateMachine.setState('dash')
            //     }
            // }

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
            if(hero.hitStun === false)
                hero.play(hero.getFormattedAnimName('jump'), true);

        },
        update() {
            if(hero.heroType instanceof IronmouseHeroType) {
                if(scene.controls.jump.isPressed && !getHeroBody().onFloor()) {
                    hero.jumpStep = 0;
                    getHeroBody().setGravityY(-1999)
                }
                else {
                    getHeroBody().setGravityY(2000)
                }
            }

            if(hero.heroType instanceof DefaultHeroType) {
                if(scene.controls.jump.isPressed && !getHeroBody().onFloor() && (Date.now() - scene.controls.jump.lastReleasedAt < 400)) {
                    hero.animStateMachine.setState('dash')
                }
            }

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
            //scene.sound.play("land", {volume: 0.4})
            getHeroBody().setGravityY(2000)

            scene.cameras.main.shake(120, 0.002, null, () => {});
        }
    })
    .addState('crouch', {
        onEnter() {
            hero.angle = 0;
            hero.play(hero.getFormattedAnimName('crouch'), true).on('animationcomplete', () => {
                hero.play(hero.getFormattedAnimName('idle-crouch'), true)
            });

            //half body size
            getHeroBody().setSize(hero.heroType.bodySize.w, hero.heroType.bodySizeSm.h)
                .setOffset(0, hero.heroType.bodySize.h - hero.heroType.bodySizeSm.h);
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
            getHeroBody().setSize(hero.heroType.bodySize.w, hero.heroType.bodySize.h).setOffset(0, 0);
        }
    })
    .addState('hurt', {
        onEnter() {
            hero.play(hero.getFormattedAnimName('hurt'), true)
            getHeroBody().setVelocityY(-CONST_BOUNCE_JUMP_VELOCITY * 1.75);
            scene.gameManager.gameSpeed = 1;
            scene.gameManager.energy = 0;
            hero.hitStun = true;
            hero.setAlpha(0.5);
            let interv = setInterval(() => {
                hero.alpha === 0.5 ? hero.setAlpha(1) : hero.setAlpha(.5);
            }, 100);

            scene.time.delayedCall(1200, () => {
                clearInterval(interv);
                hero.setAlpha(1);
                hero.hitStun = false;
                hero.play(hero.getFormattedAnimName('idle'), true)

                if (!getHeroBody().onFloor()) {
                    hero.animStateMachine.setState('fall');
                }
                else
                    hero.animStateMachine.setState('idle');
            })
            getHeroBody().setGravityY(2000);
        },
        update() {

            if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                hero.animStateMachine.setState('fall');
                return undefined;
            }
            //
            //
            // if (scene.controls.jump.isPressed) {
            //     hero.jump();
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
    .addState('pete-idle', {
        onEnter() {
            hero.angle = 0;
            hero.play("anim-pete-run", true);

        },
        update() {

            if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                hero.animStateMachine.setState('pete-fall');
            }

            if(scene.dialogBox.visible)
                return;

            if (scene.controls.left.isPressed || scene.controls.right.isPressed)
                hero.animStateMachine.setState('pete-run');

            if (!scene.controls.left.isPressed && !scene.controls.right.isPressed)
                getHeroBody().setVelocityX(0);


            if (scene.controls.jump.isPressed) {
                hero.jump();
            }

            return undefined;

        },
        onExit() {
            //hero.stop();
        }
    })
    .addState('pete-run', {
        onEnter() {
            hero.angle = 0;
            hero.play('anim-pete-run', true);
        },
        update() {

            if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                hero.animStateMachine.setState('pete-fall');
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
                hero.animStateMachine.setState('pete-idle');

            return undefined;

        },
        onExit() {
            //player.stop()
        }
    })
    .addState('pete-hurt', {
        onEnter() {
            getHeroBody().setVelocityY(-CONST_BOUNCE_JUMP_VELOCITY * 1.75);
            scene.gameManager.energy -= 0;
            hero.play('anim-pete-hurt', true);
            hero.hitStun = true;
            hero.setAlpha(0.5);
            let interv = setInterval(() => {
                hero.alpha === 0.5 ? hero.setAlpha(1) : hero.setAlpha(.5);
            }, 100);

            scene.time.delayedCall(2000, () => {
                clearInterval(interv);
                hero.setAlpha(1);
                hero.hitStun = false;
                hero.animStateMachine.setState('pete-idle');
            })
        },
        update() {

            if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                hero.animStateMachine.setState('pete-fall');
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
    .addState('pete-jump', {
        onEnter() {

            scene.sound.play("jump", {volume: 0.4})

            if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                hero.animStateMachine.setState('pete-fall');
                return;
            }

            hero.angle = -2;

            hero.play('anim-pete-jump', true);
            getHeroBody().setOffset(-7, -16).setSize(25, 25);
            hero.jumpStep = 1;
        },
        update() {

            if (getHeroBody().onCeiling()) {
                hero.animStateMachine.setState('pete-fall');
            }

            if (getHeroBody().velocity.y > 0 && !getHeroBody().onFloor()) {
                hero.animStateMachine.setState('pete-fall');
            }

            if (getHeroBody().onFloor() && getHeroBody().velocity.y === 0) {
                hero.animStateMachine.setState('pete-idle');
                return;
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
    .addState('pete-fall', {
        onEnter() {
            hero.play('anim-pete-jump', true);
            getHeroBody().setOffset(-7, -16).setSize(25, 25);
        },
        update() {
            if (getHeroBody().onFloor()) {
                getHeroBody().setVelocityX(0);
                hero.animStateMachine.setState('pete-idle');
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
            getHeroBody().setSize(32, 48).setOffset(0, 0);

        }
    })

    return machine;
}
