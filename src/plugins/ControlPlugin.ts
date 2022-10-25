import { Control } from "./control";

enum EnumGamepadInput {
    A,
    B,
    X,
    Y,
    LB,
    RB,
    LT,
    RT,
    START,
    SELECT,
    JOY1_DOWN,
    JOY2_DOWN,
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export class ControlsPlugin extends Phaser.Plugins.ScenePlugin implements Record<Controls.ControlNames, Control> {
    public left: Control;
    public right: Control;
    public up: Control;
    public jump: Control;
    public down: Control;

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager, 'Controls');

        this.left = new Control();
        this.right = new Control();
        this.up = new Control();
        this.jump = new Control();
        this.down = new Control();
    }

    start() {
        this.startListening();
        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
    }

    stop() {
        [this.left, this.right, this.jump, this.up, this.down].forEach(item => {
            item.release();
        })

        this.scene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
        this.shutdown();
    }

    private startListening() {
        //this.scene.input.gamepad.on(Phaser.Input.Gamepad.Events.CONNECTED, () => {
            this.scene.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_DOWN, this.onGamepadPress, this);
            this.scene.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_UP, this.onGamepadRelease, this);
        //}, this)

        this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.onPress, this);
        this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_UP, this.onRelease, this);
    }

    private shutdown() {

        this.scene.input.gamepad.off(Phaser.Input.Gamepad.Events.BUTTON_DOWN, this.onGamepadPress, this);
        this.scene.input.gamepad.off(Phaser.Input.Gamepad.Events.BUTTON_UP, this.onGamepadRelease, this);

        this.scene.input.keyboard.off(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.onPress, this);
        this.scene.input.keyboard.off(Phaser.Input.Keyboard.Events.ANY_KEY_UP, this.onRelease, this);

        this.left.destroy();
        this.right.destroy();
        this.up.destroy();
        this.jump.destroy();
        this.down.destroy();
    }

    private onGamepadPress(pad: Phaser.Input.Gamepad.Gamepad, btn: Phaser.Input.Gamepad.Button, value: number) {
        switch (btn.index) {
            case EnumGamepadInput.LEFT:
                this.left.press();
                break;
            case EnumGamepadInput.RIGHT:
                this.right.press();
                break;
            case EnumGamepadInput.UP:
                this.up.press();
                break;
            case EnumGamepadInput.DOWN:
                this.down.press();
                break;

            case EnumGamepadInput.A:
                this.jump.press();
                break;
        }
    }

    private onGamepadRelease(pad: Phaser.Input.Gamepad.Gamepad, btn: Phaser.Input.Gamepad.Button, value: number) {
        switch (btn.index) {
            case EnumGamepadInput.LEFT:
                this.left.release();
                break;
            case EnumGamepadInput.RIGHT:
                this.right.release();
                break;
            case EnumGamepadInput.UP:
                this.up.release();
                break;
            case EnumGamepadInput.DOWN:
                this.down.release();
                break;

            case EnumGamepadInput.A:
                this.jump.release();
                break;
        }
    }

    private onPress(e: KeyboardEvent) {
        switch (e.code) {
            case 'KeyA':
                this.left.press();
                break;
            case 'KeyD':
                this.right.press();
                break;
            case 'KeyW':
                this.up.press();
                break;
            case 'KeyS':
                this.down.press();
                break;
            case 'Space':
                this.jump.press();
                break;
        }
    }

    private onRelease(e: KeyboardEvent) {
        switch (e.code) {
            case 'KeyA':
                this.left.release();
                break;
            case 'KeyD':
                this.right.release();
                break;
            case 'KeyW':
                this.up.release();
                break;
            case 'KeyS':
                this.down.release();
                break;
            case 'Space':
                this.jump.release();
                break;
        }
    }
}
