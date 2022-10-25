import {StateMachine} from "../../StateMachine";
import baseStageScene from "../../BaseStageScene";
import EnemyBase from "./EnemyBase";


export function EnemyAnimStateMachine(props) {

    let enemyInst = props.context as EnemyBase;
    let scene = enemyInst.scene as baseStageScene;

    let machine = new StateMachine(props.context, props.name);
    machine.addState('idle', {
        onEnter() {

        },
        update() {

            return undefined;

        },
        onExit() {

        }
    })
    .addState('hurt', {
        onEnter() {

        },
        update() {

            if(enemyInst.y >= 480)
                enemyInst.destroy(true);

            return undefined;

        },
        onExit() {

        }
    });

    return machine;
}
