import { Component } from '../component'

class Exit extends Component {

  constructor (room, direction = 'N', targetRoom) {
    super()
    this.room = room
    this.targetRoom = targetRoom
    this.direction = direction.toUpperCase()
  }

  go () {

  }

}

export default Exit
