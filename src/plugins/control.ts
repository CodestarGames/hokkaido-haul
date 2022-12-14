import {createUid} from "../common/utils";

export class Control {
    private onPressListeners: Controls.ListenerConfig[];
    private onReleaseListeners: Controls.ListenerConfig[];

    public isPressed: boolean;
    public pressedAt: number | null;
    public releasedAt: number | null;
    lastReleasedAt: number | null;
    lastPressedAt: number | null;

    constructor() {
        this.onPressListeners = [];
        this.onReleaseListeners = [];

        this.isPressed = false;
        this.pressedAt = null;
        this.releasedAt = null;
    }

    onPress(callback: Controls.Listener, context?: any) {
        const id = createUid();

        this.onPressListeners.push({
            id,
            context,
            callback,
        });

        return () => {
            const listenerIndex = this.onPressListeners.findIndex(listener => listener.id === id);
            this.onPressListeners.splice(listenerIndex, 1);
        }
    }

    onRelease(callback: Controls.Listener, context?: any) {
        const id = createUid();

        this.onReleaseListeners.push({
            id,
            context,
            callback,
        });

        return () => {
            const listenerIndex = this.onReleaseListeners.findIndex(listener => listener.id === id);
            this.onReleaseListeners.splice(listenerIndex, 1);
        }
    }

    press() {
        const shouldCallListeners = !this.isPressed;
        this.isPressed = true;
        this.pressedAt = Date.now();
        this.lastReleasedAt = this.releasedAt;
        this.releasedAt = null;

        if (shouldCallListeners) {
            for (let listener of this.onPressListeners) {
                listener.callback.call(listener.context);
            }
        }
    }

    release() {
        const shouldCallListeners = this.isPressed;
        this.isPressed = false;
        this.lastPressedAt = this.pressedAt;
        this.pressedAt = null;
        this.releasedAt = Date.now();

        if (shouldCallListeners) {
            for (let listener of this.onReleaseListeners) {
                listener.callback.call(listener.context);
            }
        }
    }

    destroy() {
        this.onPressListeners = [];
        this.onReleaseListeners = [];
    }
}
