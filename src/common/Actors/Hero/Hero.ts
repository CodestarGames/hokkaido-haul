import Actor from "../Actor";
import {Action} from "../../Actions/Action";
import {ActionBehavior, Behavior} from "../../Behaviors/Behavior";
import {StateMachine} from "../../StateMachine";
import CompPhysics from "../../../components/CompPhysics";
import {HeroStateMachine} from "./HeroStateMachine";
import baseStageScene from "../../BaseStageScene";
import {Attack, Hit} from "../../Combat";
import List = Phaser.Structs.List;
import {HeroType} from "./HeroType";
import {JumpBehavior} from "../../Behaviors/MovementBehaviors/JumpBehavior";



export default class Hero extends Actor {


	animStateMachine: StateMachine;
	isFlying: boolean;
	shotCharged: boolean;
	drawAimLine: Boolean;

	private _heroType: HeroType;
	jumpStep: number;
	get heroType(): HeroType {
		return this._heroType;
	}

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x, y);

		(scene as baseStageScene).hero = this;

		this.setOrigin(0, 1)

		this.isFlying = false;
		this.shotCharged = false;
		this.drawAimLine = false;
		this.jumpStep = 0;

		//TODO: replace this lazy init
		setTimeout(() => {
			this.animStateMachine = HeroStateMachine({name: 'player', context: this}) as StateMachine;
			this.animStateMachine.setState('idle');

			this.scene.physics.add.existing(this);
			let body = this.body as Phaser.Physics.Arcade.Body;
			body.setCollideWorldBounds(false);
			body.setAllowGravity(false);

			setTimeout(() => {
				if(this.animStateMachine?.currentState.name.indexOf('pete') > -1)
					this.play('anim-pete-run', false);
				else
					this.play(this.getFormattedAnimName('idle'), false);
			}, 4000);
			//
			//  this.scene.cameras.main.setBounds(0, 0, 2400, 320);
			//
			// this.scene.cameras.main.startFollow(this, false, 0.1, 0.1);
			//  this.scene.cameras.main.setDeadzone(64, 64)

		}, 10);

	}

	isLeader: boolean;

	get behavior(): Behavior {
		return this._behavior;
	}

	private _behavior: Behavior = null;
	className: string;

	//do we have behavior that we can perform?
	get needsInput() : boolean {

		//if we have a behavior that we can't perform, then null out our current behavior.
		if (this._behavior !== null && !this._behavior.canPerform(this)) {
			this.cancelCurrentBehavior();
		}

		return this._behavior == null;
	}

	setNextAction(action : Action) {
		this._behavior = new ActionBehavior(action);
	}

	onGetAction() : Action {

		//don't perform the current behavior if it doesn't pass it's check
		if(this.needsInput) {
			this._behavior = null;
		}

		let result: Action;
		if (this._behavior) {
			if(this._behavior.alternate)
				result = this._behavior.alternate.getAction(this);
			else
				result = this._behavior.getAction(this);
		} else {
			result = null;
		}

		//clean up behavior
		this._behavior = null;

		return result;

	}

	//creates a hit based on current equipped weapon.
	onCreateMeleeHits( defender: Actor) : List<Hit> {
		let hits = new List<Hit>(null);

		//TODO: this is temporary - remove this one hit code later
		hits.add(new Attack(1).createHit());

		return hits;
	}

	cancelCurrentBehavior() {
		this._behavior = null;
	}

	jump() {
		if(this.animStateMachine?.currentState.name.indexOf('pete') > -1)
			this.animStateMachine.setState('pete-jump');
		else
			this.animStateMachine.setState('jump');

		this._behavior = new JumpBehavior();
	}

	setHeroType(heroType: HeroType) {
		this._heroType = heroType;
	}

	getFormattedAnimName(animStr: string) {
		return this.heroType.getFormattedAnimName(animStr);
	}
}
