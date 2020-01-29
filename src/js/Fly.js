import FlyView from './FlyView.js'
import timeFly from './timeFly.js'

const Fly = (params) => {
  const id = params.id ? params.id : Math.ceil(Math.random() * 9999999)
  let position = {
    x : 0,
    y : 0
  };
  const limits = params.limits  ? params.limits : {
    x : { min : 0, max : 1000 },
    y : { min : 0, max : 500 }
  };
  let line = null;
  //Time between two refresh of fly position (60 frame per seconds)
  const timeRefresh = 1000 / 60;
  
  //Attraction : between 0 and 1, the higher it is the more likely the fly will go to the center of the container
  const attraction = 0.8;
  
  let isFlying = false;
  //Display the fly
  const view = new FlyView(id);

  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  
  const getRandomNewLine = () => {
    //Random length of the line
    var minStep = Math.ceil(( 1000 / timeRefresh ) * 0.2 ); //0.3 seconde
    var maxStep = Math.ceil(( 1000 / timeRefresh ) * 0.7 ); //1 secondes
    //Random fly speed 
    var maxSpeed = 0.1
    var minSpeed = 0.1
    return {
      speed  : getNewSpeedVector(timeFly.getRandomNumber(minSpeed, maxSpeed)),
      nbStep : timeFly.getRandomInt(minStep, maxStep),
      currentStep : 0
    }
  }

  const getSeedToCenter = (speedLength) => {
    //The fly is attracted by the center of the limits
    const speed = {
      x : ( limits.x.max - limits.x.min ) / 2 - position.x,
      y : ( limits.y.max - limits.y.min ) / 2 - position.y
    };
    //Let's give it the correct length
    const l = Math.sqrt(speed.x * speed.x + speed.y * speed.y)
    return {
      x : speed.x * speedLength / l,
      y : speed.y * speedLength / l
    };
  }

  const isOutside = (newPos) => {
    return newPos.x < limits.x.min || newPos.x > limits.x.max || newPos.y < limits.y.min || newPos.y > limits.y.max
  }

  const getNewSpeedVector = (speedLength) => {
    if (Math.random() < attraction) {
      return getSeedToCenter(speedLength)
    } else {
      return timeFly.getRandomVector(speedLength)
    }
  }

  const move = () => {
    if (!line || line.currentStep === line.nbStep) {
      line = getRandomNewLine()
    }
    const newPos = {
      x : position.x + line.speed.x,
      y : position.y + line.speed.y
    }
    if (isOutside(newPos)) {
      //If it goes out of the limits we start a new line...
      line = null
      move()
      return
    }
    //Update postion
    position = newPos
    line.currentStep++
    //Display new postion
    view.move(position)
  }

  const fly = () => {
    // console.log(Math.random())
    if (!isFlying) {
      setInterval(move.bind(this), timeRefresh);
      isFlying = true;
    }
  }

  const start = () => {
    view.init(id)
    //First position is random (inside the limits)
    position = {
      x : timeFly.getRandomNumber(limits.x.min, limits.x.max),
      y : timeFly.getRandomNumber(limits.y.min, limits.y.max),
    }
    fly()
  }

  const stop = () => {
    if (isFlying) {
      clearInterval(move);
      isFlying = false;
    }
  }

  return {
    view,
    start,
    stop
  }
}

export default Fly
