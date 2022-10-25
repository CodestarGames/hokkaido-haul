export default function collideCallback(p, t) {
  var nextTile = t.tilemapLayer.getTileAt(t.x + 1, t.y);
  if (nextTile && nextTile.properties.slope) {
    //this.manageGoingDownSlope(p, t);
    this.runOnUpdate = this.manageGoingDownSlope.bind(this, p, t);
  }
}
