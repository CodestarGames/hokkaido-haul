import SceneExtended from "./SceneExtended";
import {GameExtended} from "../gameExtended";
import Actor from "./Actors/Actor";
import {HeroType} from "./Actors/Hero/HeroType";
import Hero from "./Actors/Hero/Hero";
import {PointerDownAction} from "./Actions/PointerDownAction";
import {addEffects} from "./Effect";
import {CONST_BOUNCE_JUMP_VELOCITY} from "./Constants";
import EnemyBase from "./Actors/Enemy/EnemyBase";
import {EventType} from "./Event";

let accumulator = 0;
export default abstract class baseStageScene extends SceneExtended {

    mapGraphics: Phaser.GameObjects.Graphics;

    abstract tile_layer_1: Phaser.Tilemaps.TilemapLayer
    abstract tile_layer_2: Phaser.Tilemaps.TilemapLayer;
    abstract tile_layer_3: Phaser.Tilemaps.TilemapLayer;
    abstract currentTilemap: Phaser.Tilemaps.Tilemap;
    abstract enemies_layer: Phaser.GameObjects.Layer;
    abstract spawner_layer: Phaser.GameObjects.Layer;
    testLayer: Phaser.GameObjects.Layer;

    static key = 'MainScene';
    graphics: Phaser.GameObjects.Graphics;
    itemCooldown: number = 0;



    get BTreeManager(){
        return (this.game as GameExtended).BTreeManager;
    }

    private _actors: Array<Actor> = [];

    get actors(): Actor[] {
        return this._actors;
    }

    removeActor(actorToRemove: Actor) {
        this._actors = this._actors.filter(actor => actor !== actorToRemove);
    }

    addActor(actor: Actor) {
        this._actors.push(actor);
    }


    handleInput() {
        //
        // let action = this.hero.animStateMachine?.update();
        // if (action) {
        //     this.hero.setNextAction(action);
        // }
    }

    enemyPoolGroup: Phaser.GameObjects.Group;

    staticPhysicsItemsGroup: Phaser.Physics.Arcade.StaticGroup;
    templateBoundsGroup: Phaser.GameObjects.Group;
    pillarsGroup: Phaser.GameObjects.Group;
    enemyCollisionGroup: Phaser.Physics.Arcade.Group;
    itemGroup: Phaser.Physics.Arcade.Group;
    raycaster: any;
    hero: Hero;
    stageLevelName: string;

    preload() {

    }

    create(data : { heroType: HeroType, stageKey: string, stageLevelName: string }) {
        super.create(data);

        if (this.game.config.physics.arcade.debug) {
            this.graphics = this.add.graphics();
        }
        this.stageLevelName = data.stageLevelName;

        this.enemyPoolGroup = this.add.group({
            active: false
        });

        this.gameManager.currentStage = data.stageKey;
        this.initCamera()

        this.initCollision();

        this.registerInput();

        this.children.bringToTop(this.hero);

        // @ts-ignore
        this.raycaster = this.raycasterPlugin.createRaycaster({
            //debug: true,
            boundingBox: new Phaser.Geom.Rectangle(0,0, 1920, 960)
        });

        this.hero.setHeroType(data.heroType);

    }

    initCollision() {
        this.templateBoundsGroup = this.add.group();
        this.pillarsGroup = this.add.group();
        this.staticPhysicsItemsGroup = this.physics.add.staticGroup();
        this.enemyCollisionGroup = this.physics.add.group({allowGravity: true, bounceX: 0, bounceY: 0 });

        this.itemGroup = this.physics.add.group({allowGravity: false, bounceX: 0, bounceY: 0 });

        this.physics.add.collider(this.staticPhysicsItemsGroup, this.hero, (player:any, tileLayer: any) => {

        }, (player: any, tileLayer: any) => {
            if(player.getBottomCenter().y < tileLayer.getTopCenter().y && (player.hitStun || player.animStateMachine.isCurrentState('crouch')))
                return true;
            return player.getBottomCenter().y <= tileLayer.getTopCenter().y + 4;
        }, this);

        this.physics.add.collider(this.enemyCollisionGroup, this.hero, (player:any, enemy: any) => {

            if(this.hero.animStateMachine.isCurrentState('hurt') || this.hero.animStateMachine.isCurrentState('pete-hurt') || player.hitStun)
                return;

            if (player.body.touching.down && enemy.body.touching.up && enemy.boppable === true) {

                player.body.setVelocityY(-CONST_BOUNCE_JUMP_VELOCITY);
                this.sound.play('bop', {volume: 1});
                (this.game as GameExtended).addEvent({
                    type: EventType.headBop,
                    scene: this,
                    pos: enemy.getTopCenter()
                });
                if(enemy.damagable) {
                    (enemy as EnemyBase).takeDamage(null, 1, this.hero);
                }

                return;
            }

            if(this.hero.animStateMachine?.currentState.name.indexOf('pete') > -1) {
                if(!this.hero.animStateMachine.isCurrentState('pete-hurt'))
                    this.hero.animStateMachine.setState('pete-hurt');
            }
            else {
                if(!this.hero.animStateMachine.isCurrentState('hurt'))
                    this.hero.animStateMachine.setState('hurt');
            }




        }, (player, enemy) => {
            if(this.hero.animStateMachine.isCurrentState('hurt') || this.hero.animStateMachine.isCurrentState('pete-hurt') || this.hero.hitStun)
                return false;

            return true;
        }, this);


        this.physics.add.collider(this.itemGroup, this.hero, (player:any, item: any) => {

            if(this.hero.animStateMachine.isCurrentState('hurt') || this.hero.animStateMachine.isCurrentState('pete-hurt') || player.hitStun)
                return;

            let pos = item.getTopCenter();
            pos.y -= 16;
            let itemName = this.stageLevelName === 'hokkaido' ? 'ROOTBEER' : 'CIMMAROLL';
            if((this.game as GameExtended).gameManager.energy < 5) {
                (this.game as GameExtended).addEvent({
                    type: EventType.text,
                    actor: item,
                    element: null,
                    pos,
                    dir: null,
                    options: {text: `+1 ${itemName}`}
                });
                this.sound.play('sfx-get', {volume: 0.2});
                (this.game as GameExtended).gameManager.energy += 1;
            }

            this.itemGroup.remove(item, true);

        }, (player, enemy) => {
            if(this.hero.animStateMachine.isCurrentState('hurt') || this.hero.animStateMachine.isCurrentState('pete-hurt') || this.hero.hitStun)
                return false;

            return true;
        }, this);


        this.physics.add.collider(this.staticPhysicsItemsGroup, this.enemyCollisionGroup, (enemy: any, tileLayer: any) => {

        }, () => {
            return true;
        }, this);

    }

    onUpdate(dt) {
        //update the behavior tree manager's internal timer.
        this.BTreeManager.update(dt);

        let result = (this.game as GameExtended).updateGameQueue();

        for (const event of result.events.list) {
            if(event.actor && !event.actor.active)
                continue;

            addEffects(this.game as GameExtended, event);
        }

        this.hero?.animStateMachine?.update();
    }

    update(time, dt) {
        accumulator += dt;
        while(accumulator >= 16.66) {

            accumulator -= 16.66;
            super.update(time, dt);
            this.onUpdate(dt)

        }


    }

    private registerInput() {

        this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer, targetGameObjects) => {
            this.hero.setNextAction(new PointerDownAction(pointer, targetGameObjects));
        });

        this.input.on(Phaser.Input.Events.POINTER_UP, (pointer, items) => {
            //TODO: revisit this. Needs to be right click hold behavior.
            //this.hero.shootPaintBall();
        });
    }

    initCamera() {

    }


    onDestroy(scene) {
        super.onDestroy(scene);

    }

}
