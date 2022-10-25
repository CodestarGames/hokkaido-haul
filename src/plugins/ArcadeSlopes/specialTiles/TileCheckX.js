import ProcessTileSeparationX from "./ProcessTileSeparationX";

var TileCheckX = function(body, tile, tileLeft, tileRight, tileBias) {
  var ox = 0;

  var faceLeft = tile.faceLeft;
  var faceRight = tile.faceRight;
  var collideLeft = tile.collideLeft;
  var collideRight = tile.collideRight;

  if (body.deltaX() < 0 && collideRight) {
    //  Body is moving LEFT
    if (faceRight && body.x < tileRight) {
      ox = body.x - tileRight;

      if (ox < -tileBias) {
        ox = 0;
      }
    }
  } else if (body.deltaX() > 0 && collideLeft) {
    //  Body is moving RIGHT
    if (faceLeft && body.right > tileLeft) {
      ox = body.right - tileLeft;

      if (ox > tileBias) {
        ox = 0;
      }
    }
  }

  if (ox !== 0) {
    ProcessTileSeparationX(body, ox);
  }

  return ox;
};

export default TileCheckX;
