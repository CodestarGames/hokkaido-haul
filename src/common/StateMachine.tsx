import {Action} from "./Actions/Action";
//
// export const StateMachineDef = (attributes: {context: any, name: string }, children: any) => {
//     let stateMachine = new StateMachine(attributes.context, attributes.name);
//
//     children.forEach((child) => {
//         child && Object.assign(child, Object.assign({
//             context: attributes.context
//         }));
//
//         stateMachine.addState(child.name, child)
//     })
//
//     return stateMachine;
// }
//
// export const StateMachineState = (attributes: IState) => {
//     return {
//         children: null,
//         uid: attributes.name,
//         name: attributes.name,
//         onEnter: attributes.onEnter,
//         update: attributes.update,
//         onExit: attributes.onExit
//     };
// }

interface IState
{
    children?: any
    name: string
    onEnter?: () => void
    update?: () => Action
    onExit?: () => void
}

let idCount = 0

export class StateMachine {
    get currentState(): IState {
        return this._currentState;
    }
    uid = (++idCount).toString()
    get key() {
        return this.uid;
    }
    private context?: object
    _children = new Map<string, IState>()
    children:any;
    private previousState?: IState
    private _currentState?: IState
    private isChangingState = false
    private changeStateQueue: string[] = []

    get previousStateName()
    {
        if (!this.previousState)
        {
            return ''
        }

        return this.previousState.name
    }

    constructor(context?: object, id?: string)
    {
        this.uid = id ?? this.uid
        this.context = context
    }

    isCurrentState(name: string)
    {
        if (!this._currentState)
        {
            return false
        }

        return this._currentState.name === name
    }

    addState(name: string, config?: { onEnter?: () => void, update?: (dt: number) => void, onExit?: () => void })
    {
        const context = this.context

        this._children.set(name, {
            name,
            onEnter: config?.onEnter?.bind(context),
            update: config?.update?.bind(context),
            onExit: config?.onExit?.bind(context)
        })

        return this
    }

    setState(name: string)
    {
        if (!this._children.has(name))
        {
            console.warn(`Tried to change to unknown state: ${name}`)
            return
        }

        if (this.isCurrentState(name))
        {
            return
        }

        if (this.isChangingState)
        {
            this.changeStateQueue.push(name)
            return
        }

        this.isChangingState = true

        console.log(`[StateMachine (${this.uid})] change from ${this._currentState?.name ?? 'none'} to ${name}`)

        if (this._currentState && this._currentState.onExit)
        {
            this._currentState.onExit()
        }

        this.previousState = this._currentState
        this._currentState = this._children.get(name)!

        if (this._currentState.onEnter)
        {
            this._currentState.onEnter()
        }

        this.isChangingState = false
    }

    update() : Action {
        if (this.changeStateQueue.length > 0)
        {
            this.setState(this.changeStateQueue.shift()!)
            return undefined;
        }

        if (this._currentState && this._currentState.update)
        {
            return this._currentState.update()
        }

        return undefined

    }
}
