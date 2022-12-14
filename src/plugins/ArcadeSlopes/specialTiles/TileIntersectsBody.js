var TileIntersectsBody = function(tileWorldRect, body) {
  return !(
    body.right <= tileWorldRect.left ||
    body.bottom <= tileWorldRect.top ||
    body.position.x >= tileWorldRect.right ||
    body.position.y >= tileWorldRect.bottom
  );
};

export default TileIntersectsBody;
