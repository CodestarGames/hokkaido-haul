import TileIntersectsBody from "./TileIntersectsBody";

import TileCheckX from "./TileCheckX";
import TileCheckY from "./TileCheckY";
import TileCheckSlopeY from "./TileCheckSlopeY";

var SeparateTile = function(body, tile, tileWorldRect, tileBias) {
  var tileLeft = tileWorldRect.left;
  var tileTop = tileWorldRect.top;
  var tileRight = tileWorldRect.right;
  var tileBottom = tileWorldRect.bottom;

  var ox = 0;
  var oy = 0;
  var minX = 0;
  var minY = 1;

  if (body.deltaAbsX() > body.deltaAbsY()) {
    //  Moving faster horizontally, check X axis first
    minX = -1;
  } else if (body.deltaAbsX() < body.deltaAbsY()) {
    //  Moving faster vertically, check Y axis first
    minY = -1;
  }

  if (body.deltaX() !== 0 && body.deltaY() !== 0) {
    //  We only need do this if both axes have colliding faces AND we're moving in both
    //  directions
    minX = Math.min(
      Math.abs(body.position.x - tileRight),
      Math.abs(body.right - tileLeft)
    );
    minY = Math.min(
      Math.abs(body.position.y - tileBottom),
      Math.abs(body.bottom - tileTop)
    );
  }

  if (minX < minY) {
    ox = TileCheckX(body, tile, tileLeft, tileRight, tileBias);

    //  That's horizontal done, check if we still intersects? If not then we can return now
    if (ox !== 0 && !TileIntersectsBody(tileWorldRect, body)) {
      return true;
    }

    oy = TileCheckY(body, tile, tileTop, tileBottom, tileBias);
  } else {
    oy = TileCheckY(body, tile, tileTop, tileBottom, tileBias);

    //  That's vertical done, check if we still intersects? If not then we can return now
    if (oy !== 0 && !TileIntersectsBody(tileWorldRect, body)) {
      return true;
    }

    ox = TileCheckX(body, tile, tileLeft, tileRight, tileBias);
  }

  return ox !== 0 || oy !== 0;
};

var SeparateSlopeTile = function(body, tile, tileWorldRect, tileBias) {
  //var tileLeft = tileWorldRect.left;
  var tileTop = tileWorldRect.top;
  //var tileRight = tileWorldRect.right;
  var tileBottom = tileWorldRect.bottom;

  var ox = 0;
  var oy = 0;

  oy = TileCheckSlopeY(body, tile, tileTop, tileBottom, tileBias);

  return ox !== 0 || oy !== 0;
};

var SeparateTilePlank = function(body, tile, tileBias) {
  var tileWorldRect = { left: 0, right: 0, top: 0, bottom: 0 };
  tileWorldRect.left = tile.tilemapLayer.tileToWorldX(tile.x);
  tileWorldRect.top = tile.tilemapLayer.tileToWorldY(tile.y);
  tileWorldRect.right =
    tileWorldRect.left + tile.width * tile.tilemapLayer.scaleX;
  tileWorldRect.bottom =
    tileWorldRect.top + (tile.height - 11) * tile.tilemapLayer.scaleY;
  SeparateTile(body, tile, tileWorldRect, tileBias);
};

var SeparateTileSlope = function(body, tile, tileBias, graphics, debug) {
  //var walking = body.deltaAbsX() > 0.5;
  var tileWorldRect = { left: 0, right: 0, top: 0, bottom: 0 };
  var realTop = tile.tilemapLayer.tileToWorldY(tile.y);
  tileWorldRect.left = tile.tilemapLayer.tileToWorldX(tile.x);
  tileWorldRect.right =
    tileWorldRect.left + tile.width * tile.tilemapLayer.scaleX;
  var ox = 0;

  if (tile.flipX) {
    ox = body.left - tileWorldRect.left;
    tileWorldRect.top = realTop + ox;
    tileWorldRect.bottom =
      tileWorldRect.top + tile.height * tile.tilemapLayer.scaleY + ox;
  } else {
    ox = tileWorldRect.right - body.right;
    if (ox < 0) {
      ox = 0;
    }
    tileWorldRect.top = realTop + ox;
    tileWorldRect.bottom =
      tileWorldRect.top + tile.height * tile.tilemapLayer.scaleY + ox;
  }

  if (debug) {
    graphics.clear();
    var thickness = 1;
    var color = 0x00ff00;
    var alpha = 1;
    graphics.lineStyle(thickness, color, alpha);
    graphics.strokeRect(
      tileWorldRect.left,
      tileWorldRect.top,
      16, //tileWorldRect.right - tileWorldRect.left,
      16 //tileWorldRect.bottom - tileWorldRect.top
    );
  }
  SeparateSlopeTile(body, tile, tileWorldRect, tileBias);

  return true;
};

export { SeparateTilePlank, SeparateTileSlope };
