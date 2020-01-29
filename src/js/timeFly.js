const timeFly = {
  /**
   * Random integer between min and max
   */

  getRandomInt: function(min, max) {
    return Math.ceil(Math.floor(Math.random() * max) + min)
  },

  /**
   * Random number between min and max
   */

  getRandomNumber: function(min, max) {
    return timeFly.getRandomInt(min * 1000, max * 1000, false) / 1000
  },

  /**
  * Pseudo random number between min and max with a gaussian distribution
  */

  getPseudoRandomNumber: function(min, max, center) {
    return timeFly.getRandomInt(min * 1000, max * 1000, true) / 1000
  },

  /**
  * Random +1,-1
  */

  getRandomSign: function() {
    return Math.random() < 0.5 ? -1 : 1
  },

  /**
  * Provide a random vector (x,y) of the given length
  */

  getRandomVector: function(length) {
    //x : random number beteewn +/- length
    const x = timeFly.getRandomSign() * timeFly.getRandomNumber(0, length)
    //y square is then fixed...
    const ySquare = length * length - x * x
    //y is then +/- square root ySquare
    return {
      "x" : x,
      "y" : timeFly.getRandomSign() * Math.sqrt(ySquare)
    }
  }
}

export default timeFly
