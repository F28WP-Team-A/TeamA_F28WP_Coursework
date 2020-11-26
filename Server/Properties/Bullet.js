// allot of the code for this comes from
// https://www.youtube.com/watch?v=Tm-PXo9udWQ&list=PLcIaPHraYF7k4FbeGIDY-1mZZdjTu9QyL&index=5
// bullet object is a type of Entity and a child of the Player object
// has a random id to keep bullets unique and to time individual bullets out
// in theory this could duplicate but its so unlikely to be pointless
// has a spdX and spdY which is a vector from where its shot from a circle
// has a parent which allows for the spaceships not to harm one another
// timer to time individual bullets out

Bullet = function (parent, angle) {
  var self = Entity();
  self.id = Math.random();
  self.spdX = Math.cos((angle / 180) * Math.PI) * 10;
  self.spdY = Math.sin((angle / 180) * Math.PI) * 10;
  self.parent = parent;
  self.timer = 0;
  self.toRemove = false;
  // this is for the update package
  var super_update = self.update;
  self.update = function () {
    if (self.timer++ > 30) self.toRemove = true;
    super_update();
    // uses the getDistance in the Entity variabel to get
    // the distance from the bullet to the ship
    // the logic for this comes from
    //https://www.youtube.com/watch?v=S-l3EWhBh9c&list=PLcIaPHraYF7k4FbeGIDY-1mZZdjTu9QyL&index=7
    for (var i in Player.list) {
      var p = Player.list[i];
      if (self.getDistance(p) < 32 && self.parent !== p.id) {
        p.hp -= 1;
        // if the bullet infilicts enough damage to reduce a ships hp to 0
        // tells the ship to reset to max hp
        // and respawn anywhere in the canvas
        // give the killing ship +1 score

        if (p.hp <= 0) {
          var shooter = Player.list[self.parent];
          if (shooter) shooter.score += 1;
          p.hp = p.hpMax;
          p.x = Math.random() * 1000;
          p.y = Math.random() * 1000;
        }

        self.toRemove = true;
      }
    }
    for (var i in Player.list) {
      for (var y in Shield.list) {
        var s = Shield.list[y];
        if (self.getDistance(s) > 100) self.toRemove = true;
      }
    }
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
  Bullet.list[self.id] = self;
  // and pushes the bullet intial package onto the initPack array in app.js
  initPack.bullet.push(self.getInitPack());
  return self;
};
// creates a list of bullets
Bullet.list = {};

// logic for the Bullet update package
// loops through each individual bullet in the bullet array
// and checks if they should be deleted
// otherwise it pushes the bullets individual update pack
Bullet.update = function () {
  var pack = [];
  for (var i in Bullet.list) {
    var bullet = Bullet.list[i];
    bullet.update();
    if (bullet.toRemove) {
      delete Bullet.list[i];
      removePack.bullet.push(bullet.id);
    } else pack.push(bullet.getUpdatePack());
  }
  return pack;
};
// creates the Initial Pack for the Bullets works in a similar way to the update pack
Bullet.getAllInitPack = function () {
  var bullets = [];
  for (var i in Bullet.list) bullets.push(Bullet.list[i].getInitPack());
  return bullets;
};
