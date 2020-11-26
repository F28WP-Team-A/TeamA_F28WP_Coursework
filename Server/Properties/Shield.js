Shield = function (parent) {
  var self = Entity();
  self.id = Math.random();
  self.parent = parent;
  self.timer = 0;
  self.toRemove = false;
  // this is for the update package
  var super_update = self.update;
  self.update = function () {
    if (self.timer++ > 30) self.toRemove = true;
    super_update();
  };

  // gets the initial package for the bullet objects
  self.getInitPack = function () {
    return {
      id: self.id,
      x: self.x,
      y: self.y
    };
  };
  // gets the update package for the bullet objects
  self.getUpdatePack = function () {
    return {
      id: self.id,
      x: self.x,
      y: self.y
    };
  };
  // creates an array list of bullet objects
  Shield.list[self.id] = self;
  // and pushes the bullet intial package onto the initPack array in app.js
  initPack.shield.push(self.getInitPack());
  return self;
};
// creates a list of bullets
Shield.list = {};

// logic for the Bullet update package
// loops through each individual bullet in the bullet array
// and checks if they should be deleted
// otherwise it pushes the bullets individual update pack
Shield.update = function () {
  var pack = [];
  for (var i in Shield.list) {
    var shield = Shield.list[i];
    shield.update();
    if (shield.toRemove) {
      delete Shield.list[i];
      removePack.shield.push(shield.id);
    } else pack.push(shield.getUpdatePack());
  }
  return pack;
};
// creates the Initial Pack for the Bullets works in a similar way to the update pack
Shield.getAllInitPack = function () {
  var shields = [];
  for (var i in Shield.list) shields.push(Shield.list[i].getInitPack());
  return shields;
};
