import { Component } from './component'
import { Map } from './map/map'
import { Player } from './player'
import { State } from './state'

class World extends Component {

  constructor (map, player, states) {
    super()
    this.map = map || new Map()
    this.player = player || new Player()
    this.state = new State(states)
    this.updateCounter = 0
    this.lastUpdate = performance.now()
  }

  update () {
    let now = performance.now()
    let elapsed = now - this.lastUpdate
    this.preUpdate()
    super(elapsed)
    this.updateCounter++
    this.lastUpdate = now
    this.postUpdate()
  }

}

export default World
