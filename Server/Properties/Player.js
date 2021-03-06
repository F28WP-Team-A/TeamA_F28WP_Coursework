// player object allot of the code comes from https://www.youtube.com/watch?v=S-l3EWhBh9c&list=PLcIaPHraYF7k4FbeGIDY-1mZZdjTu9QyL&index=7
// creates a global variable called Player that contains
// an individual id which is equal to the SOCKET_ID
// movement logic pressingRight left up down
// and logic for making attacks based on mouse angle and clicking the left mouse button
// also has a hp max Hp and a score for the game based elements

Player = function (id) {
  var self = Entity();
  self.id = id;
  self.pressingRight = false;
  self.pressingLeft = false;
  self.pressingUp = false;
  self.pressingDown = false;
  self.pressingAttack = false;
  self.mouseAngle = 0;
  self.maxSpd = 10;
  self.hp = 10;
  self.hpMax = 10;
  self.score = 0;
  // is used in the update package to find the new position of the spaceship
  // also for shooting bullets
  var super_update = self.update;
  self.update = function () {
    self.updateSpd();
    super_update();

    if (self.pressingAttack) {
      self.shootBullet(self.mouseAngle);
    }
    if (self.pressingShield) self.activateShield();
  };
  // creates a fucntion to shoot a bullet by calling on the Bullet object
  self.activateShield = function () {
    var s = Shield(self.id);
    s.x = self.x;
    s.y = self.y;
  };

  self.shootBullet = function (angle) {
    var b = Bullet(self.id, angle);
    b.x = self.x;
    b.y = self.y;
  };
  // movement could be used to simulate gravity
  // prevents leaving the bounds of the game

  self.updateSpd = function () {
    if (self.pressingRight && self.x < 1000) self.spdX = self.maxSpd;
    else if (self.pressingLeft && self.x > 0) self.spdX = -self.maxSpd;
    else self.spdX = 0;

    if (self.pressingUp && self.y > 0) self.spdY = -self.maxSpd;
    else if (self.pressingDown && self.y < 1000) self.spdY = self.maxSpd;
    else self.spdY = 0;
  };
  // gets the initial package for the game
  self.getInitPack = function () {
    return {
      id: self.id,
      x: self.x,
      y: self.y,
      number: self.number,
      hp: self.hp,
      hpMax: self.hpMax,
      score: self.score
    };
  };
  // gets the update package for the game
  self.getUpdatePack = function () {
    return {
      id: self.id,
      x: self.x,
      y: self.y,
      hp: self.hp,
      score: self.score
    };
  };

  Player.list[id] = self;

  initPack.player.push(self.getInitPack());
  return self;
};

Player.list = {};
