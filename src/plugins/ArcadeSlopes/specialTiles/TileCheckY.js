import ProcessTileSeparationY from "./ProcessTileSeparationY";

var TileCheckY = function(body, tile, tileTop, tileBottom, tileBias) {
  var oy = 0;

  var faceTop = tile.faceTop;
  var faceBottom = tile.faceBottom;
  var collideUp = tile.collideUp;
  var collideDown = tile.collideDown;

  if (body.deltaY() < 0 && collideDown) {
    //  Body is moving UP
    if (faceBottom && body.y < tileBottom) {
      oy = body.y - tileBottom;

      if (oy < -tileBias) {
        oy = 0;
      }
    }
  } else if (body.deltaY() > 0 && collideUp) {
    //  Body is moving DOWN
    if (faceTop && body.bottom > tileTop) {
      oy = body.bottom - tileTop;

      if (oy > tileBias) {
        oy = 0;
      }
    }
  }

  if (oy !== 0) {
    ProcessTileSeparationY(body, oy);
  }

  return oy;
};

export default TileCheckY;
