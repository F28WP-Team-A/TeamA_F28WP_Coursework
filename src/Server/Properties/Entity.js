// global variable as jnode doesnt like express / import i've used this slightly hacky method to get around it
// the entity object which is the basis of all other objects
// contains a position x and y at the center of the canvas
// with a spdX and spdY for horizontal distances
// almost everything can be declaired as an entity
// but entititys are not allowed by themselves
Entity = function () {
  var self = {
    x: 250,
    y: 250,
    spdX: 0,
    spdY: 0,
    id: ""
  };
  // finds the position of the entity
  self.update = function () {
    self.updatePosition();
  };
  // updates the position of the entity for the Update package

  self.updatePosition = function () {
    self.x += self.spdX;
    self.y += self.spdY;
  };
  // gets the distance from other entitys
  self.getDistance = function (pt) {
    return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
  };
  return self;
};
