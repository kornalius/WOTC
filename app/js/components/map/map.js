import { Component } from '../component'
import { Position } from '../position'

class Map extends Component {

  constructor (rooms) {
    super()
    this.rooms = rooms || {}
  }

  roomAt (x, y) {
    var name
    if (x instanceof Position) {
      name = x.toString()
    } else {
      name = new Position(x, y).toString()
    }
    return this.rooms[name]
  }

}

export default Map
