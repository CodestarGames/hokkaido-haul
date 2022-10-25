/// For multi-step actions, lets you define one using a `sync*` function and
/// `yield` instead of building the state machine manually.
import {Action, ActionResult} from "./Action";

export class GeneratorActionMixin extends Action {
    _iterator: any;

    hasIterator: boolean = true;
    currentStep: number = 0;

    onPerform(): ActionResult {
        // Start the generator the first time through.
        if (this._iterator == null) this._iterator = this.onGenerate();

        if (this.currentStep === 0) {
            this.onStart();
        }

        let yieldObj = this._iterator.next();
        this.onStep(this.currentStep);
        this.currentStep++;
        //
        // if(!yieldObj.value)
        //     debugger;

        if (yieldObj.value.done) {
            this.onComplete();
            return yieldObj.value;
        }


        return yieldObj.value;
    }

    /// Wait a single frame.
    waitOne(): ActionResult {
        console.log("wait");
        return ActionResult.RUNNING;
    }

    /// Wait [frame] frames.
    //  wait(frames : number) {
    //     return List.(frames, (_) => ActionResult.notDone);

    onGenerate(): any {

        return null;
    };

    onComplete = () => {

    }

    onStart = () => {

    }

    onStep = (currentStep: number) => {

    }
}
