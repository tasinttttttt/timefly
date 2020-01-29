import Fly from './Fly.js'
import SwarmView from './SwarmView.js'

const Swarm = (params) => {
  const id = params.id ? params.id : Math.ceil(Math.random() * 99999999)
  const size = params.size ? params.size : 300
  const nbFlies = params.nbFlies ? params.nbFlies : 20
  const limits = {
    x : { min : 0, max : size},
    y : { min : 0, max : size},
  }
  const flies = []

  for (let i = 0; i < nbFlies; i++) {
    flies.push(new Fly({
      id : id + "-fly-" + i,
      limits: limits
    }))
  }

  const view = new SwarmView({ id: id, size : size })

  const start = () => {
    view.init(flies)
    for (let i = 0; i < flies.length; i++) {
      let fly = flies[i]
      fly.start()
    }
  }
  return {
    id,
    size,
    limits,
    flies,
    start
  }
}

export default Swarm
