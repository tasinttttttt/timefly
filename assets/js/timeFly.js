/**
 * Return random number between 0 and 1 with a higher chance to be close to 0 than 1
 * @returns
 */

Math.pseudoRandom = function () {
  return Math.abs(((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3);
};

var timeFly = timeFly || {};

/**
 * Random integer between min and max
 */

timeFly.getRandomInt = function (min, max) {
  return Math.ceil(Math.floor(Math.random() * max) + min);
};

/**
 * Random number between min and max
 */

timeFly.getRandomNumber = function (min, max) {
  return timeFly.getRandomInt(min *1000, max * 1000, false) / 1000;
};

/**
 * Pseudo random number between min and max with a gaussian distribution
 */

timeFly.getPseudoRandomNumber = function (min, max, center) {
  return timeFly.getRandomInt(min *1000, max * 1000, true) / 1000;
};

/**
 * Random +1,-1
 */

timeFly.getRandomSign = function () {
  return Math.random() < 0.5 ? -1 : 1;
};

/**
 * Provide a random vector (x,y) of the given length
 */

timeFly.getRandomVector = function (length) {
  //x : random number beteewn +/- length
  var x = timeFly.getRandomSign() * timeFly.getRandomNumber(0, length);
  //y square is then fixed...
  var ySquare = length * length - x * x;
  //y is then +/- square root ySquare
  return {"x" : x, "y" : timeFly.getRandomSign() * Math.sqrt(ySquare) };
};