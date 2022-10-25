import baseStageScene from "../../BaseStageScene";

export default class PlayerTexture {
    private bugImage: Phaser.GameObjects.Image;
    renderTexture: Phaser.GameObjects.RenderTexture;
    key: string;
    private layerList: { key: string, active: boolean }[];
    private defaultKey: string;
    private scene: baseStageScene;

    constructor(scene, textureKey, layerList) {
        this.scene = scene;
        this.defaultKey = textureKey;
        this.layerList = layerList;

        this._createPlayerRenderTexture(textureKey);
    }

    activate(name) {
        var layer = this.layerList[name];
        layer.active = true;

        this.renderTexture.draw(layer.key, 0, 0);
    }

    activateAll() {
        for (const prop in this.layerList) {
            this.activate(prop);
        }
    }

    deactivate(name) {
        var layer = this.layerList[name];
        layer.active = false;

        this._removeAllLayers();

        this._drawActive();
    }

    deactivateAll() {
        for (const prop in this.layerList) {
            this.layerList[prop].active = false;
        }

        this._removeAllLayers();
    }

    _removeAllLayers() {
        this.renderTexture.clear();

        var originalTexture = this.scene.textures.get(this.defaultKey);
        var frames = originalTexture.getFramesFromTextureSource(0, false);

        for (const frame of frames) {
            this.renderTexture.drawFrame(
                this.defaultKey,
                frame.name,
                frame.cutX,
                frame.cutY
            );
        }
    }

    _drawActive() {
        // for (const prop in this.layerList) {
        //     if (this.layerList[prop].active) {
        //         this.renderTexture.draw(this.layerList[prop].key, 0, 0);
        //     }
        // }
    }

    _createPlayerRenderTexture(textureKey) {
        var originalTexture = this.scene.textures.get(textureKey);
        var frames = originalTexture.getFramesFromTextureSource(0, false);

        var source = originalTexture.source[0];
        this.renderTexture = this.scene.make.renderTexture(
            {
                width: source.width,
                height: source.height
            },
            false
        );

        this.key = textureKey + "T";
        //var headTexture = this.scene.textures.get('player-spritesheet-heads');
        //this.renderTexture.drawFrame('player-spritesheet-heads', '__BASE', 0, 0);

        let playerTexture: Phaser.Textures.Texture = this.renderTexture.saveTexture(this.key);

        for (const frame of frames) {
            this.renderTexture.drawFrame(
                textureKey,
                frame.name,
                frame.cutX,
                frame.cutY
            );

            this.renderTexture.drawFrame(
                textureKey,
                frame.name,
                frame.cutX,
                frame.cutY
            );
        }

        //ToDo: Destroy after rendered outside?
        // @ts-ignore
        //this.bugImage = this.scene.add.image(-playerTexture.width, -playerTexture.height, this.key);

        //this.scene.sys.events.on("postupdate", this._removeBugImage, this);

        for (const frame of frames) {
            playerTexture.add(
                frame.name,
                0,
                frame.cutX,
                frame.cutY,
                frame.width,
                frame.height
            );
        }

        this._drawActive();
    }

}
