import Phaser from "phaser";
import PhaserRaycaster from 'phaser-raycaster';

import {GameExtended} from "./gameExtended";
import {Boot} from "./boot";
import ControllerScene from "./scenes/ControllerScene";
import registerNinePatchFactory from "./plugins/registerNinePatchFactory";
import registerNinePatchContainerFactory from "./plugins/registerNinePatchContainerFactory";
import registerNinePatchImageFactory from "./plugins/registerNinePatchImageFactory";
import {ControlsPlugin} from "./plugins/ControlPlugin";
import GameStats from 'gamestats.js/build/gamestats.js'

// // @ts-ignore
// window.stats = new GameStats();
// // @ts-ignore
// document.body.appendChild( window.stats.dom );

window.addEventListener('load', function () {

    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('debugTreeChild')) {
        return;
    }

    let game = new GameExtended({
        width: 640,
        height: 576,
        type: Phaser.WEBGL,
        backgroundColor: "#000000",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 640,
            height: 576,
        },
        roundPixels: true,
        pixelArt: true,
        input: {
            gamepad: true
        },
        plugins: {
            scene: [
                {
                    key: 'Controls',
                    plugin: ControlsPlugin,
                    mapping: 'controls',
                },
                {
                    key: 'PhaserRaycaster',
                    plugin: PhaserRaycaster,
                    mapping: 'raycasterPlugin'
                },
                {
                    key: 'ninepatch',
                    plugin: registerNinePatchFactory
                },
                {
                    key: 'ninepatchimage',
                    plugin: registerNinePatchImageFactory
                },
                {
                    key: 'ninepatchcontainer',
                    plugin: registerNinePatchContainerFactory
                }
            ]
        },
        physics: {
            default: 'arcade',
            arcade: {
                //debug: true,
                gravity: {y: 2000}
            }
        },
        scene: Boot
    });

    game.scene.add("ControllerScene", ControllerScene, false);


});

