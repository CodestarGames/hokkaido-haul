import {GeneratorActionMixin} from "./GeneratorActionMixin";
import {Action} from "./Action";
import {Mixin} from 'ts-mixer';

export class BTreeResultAction extends Mixin(GeneratorActionMixin, Action) {
    constructor(readonly treeState) {
        super();
    }

    get isImmediate(): boolean {
        return false;
    }

    * onGenerate() {
        if (this.treeState.done === false) {
            yield this.treeState;
        }

        return this.succeed();
    }

}
