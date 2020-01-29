
import 'style/general.scss'
import Swarm from './js/Swarm.js'

const swarm = new Swarm({
  id : "swarm",
  nbFlies : 30,
  size : 300
})

swarm.start()
