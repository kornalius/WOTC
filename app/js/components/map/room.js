import { Component } from '../component'
import { State } from '../state'
import { Items } from '../items/items'
import { Story } from './story'
import { Position } from '../position'

class Room extends Component {

  constructor (parent, id, name, image, desc, story, exits, items, states) {
    super()
    this.parent = parent
    this.id = id
    this.name = name
    this.image = image
    this.desc = desc
    this.exits = exits || {}
    this.state = new State(states)
    this.items = new Items(items)
    this.story = new Story(story)
    this.position = new Position()
  }

  hasExit (direction) {
    return direction ? this.exits[direction.toUpperCase()] : !_.isEmpty(this.exits)
  }

  describe () {

  }

}

export default Room
