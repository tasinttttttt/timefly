Fly = function (params) {
  this.position = {
    x : 0,
    y : 0
  };
  this.limits = params.limits  ? params.limits : {
    x : { min : 0, max : 1000 },
    y : { min : 0, max : 500 }
  };
  this.line = null;
  //Time between two refresh of fly position (60 frame per seconds)
  this.timeRefresh = 1000 / 60;
  //Attraction : between 0 and 1, the higher it is the more likely the fly will go to the center of the container
  this.attraction = 0.8;
  this.isFlying = false;
  //Display the fly
  this.view = new FlyView(params.id);
};

Fly.prototype.start = function () {
  this.view.init.call(this.view);
  //First position is random (inside the limits)
  this.position = {
    x : timeFly.getRandomNumber(this.limits.x.min, this.limits.x.max),
    y : timeFly.getRandomNumber(this.limits.y.min, this.limits.y.max),
  };
  this.fly.call(this);
};

Fly.prototype.fly = function () {
  if (!this.isFlying) {
    setInterval(this.move.bind(this), this.timeRefresh);
    this.isFlying = true;
  }
};

Fly.prototype.stop = function () {
  if (this.isFlying) {
    clearInterval(this.move);
    this.isFlying = false;
  }
};

Fly.prototype.move = function () {
  if (!this.line || this.line.currentStep === this.line.nbStep) {
    this.line = this.getRandomNewLine.call(this);
  }
  var newPos = { x : this.position.x + this.line.speed.x, y : this.position.y + this.line.speed.y };
  if (this.isOutside.call(this, newPos)) {
    //If it goes out of the limits we start a new line...
    this.line = null;
    this.move.call(this);
    return;
  }
  //Update postion
  this.position = newPos;
  this.line.currentStep++;
  //Display new postion
  this.view.move.call(this.view, this.position);
};

Fly.prototype.getRandomNewLine = function () {
  //Random length of the line
  var minStep = Math.ceil(( 1000 / this.timeRefresh ) * 0.2 ); //0.3 seconde
  var maxStep = Math.ceil(( 1000 / this.timeRefresh ) * 0.7 ); //1 secondes
  //Random fly speed 
  var maxSpeed = 0.1;
  var minSpeed = 0.1;
  return {
    speed  : this.getNewSpeedVector.call(this, timeFly.getRandomNumber(minSpeed, maxSpeed)),
    nbStep : timeFly.getRandomInt(minStep, maxStep),
    currentStep : 0
  };
};

Fly.prototype.isOutside = function (newPos) {
  return newPos.x < this.limits.x.min || newPos.x > this.limits.x.max || newPos.y < this.limits.y.min || newPos.y > this.limits.y.max;
};

Fly.prototype.getNewSpeedVector = function (speedLength) {
  if (Math.random() < this.attraction) {
    return this.getSeedToCenter.call(this, speedLength);
  } else {
    return timeFly.getRandomVector(speedLength);
  }
};

Fly.prototype.getSeedToCenter = function (speedLength) {
  //The fly is attracted by the center of the limits
  var speed = {
    x : ( this.limits.x.max - this.limits.x.min ) / 2 - this.position.x,
    y : ( this.limits.y.max - this.limits.y.min ) / 2 - this.position.y
  };
  //Let's give it the correct length
  var l = Math.sqrt(speed.x * speed.x + speed.y * speed.y);
  return {
    x : speed.x * speedLength / l,
    y : speed.y * speedLength / l
  };
};
