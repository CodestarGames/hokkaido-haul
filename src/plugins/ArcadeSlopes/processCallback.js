import {
  SeparateTilePlank,
  SeparateTileSlope
} from "./specialTiles/SeparateTile";

export default function processCallback(p, t) {
  if (t.properties.topPlank) {
    p.body.customSeparateX = true;
    p.body.customSeparateY = true;

    return SeparateTilePlank(p.body, t, this.scene.physics.world.TILE_BIAS);
  }

  if (t.properties.slope) {
    p.body.customSeparateX = true;
    p.body.customSeparateY = true;

    var collide = SeparateTileSlope(
      p.body,
      t,
      this.scene.physics.world.TILE_BIAS,
      this.scene.graphics,
      this.scene.game.config.physics.arcade.debug
    );

    //this.manageGoingDownSlope(p, t);
    this.runOnUpdate = this.manageGoingDownSlope.bind(this, p, t, false);

    return collide;
  }

  p.body.customSeparateX = false;
  p.body.customSeparateY = false;

  return true;
}
