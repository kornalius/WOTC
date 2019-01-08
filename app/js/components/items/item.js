import { Component } from '../component'
import { State } from '../state'

class Item extends Component {

  constructor (parent, id, name, icon, desc, states) {
    super()
    this.parent = parent
    this.id = id
    this.name = name
    this.icon = icon
    this.desc = desc
    this.state = new State(states)
  }

  clone () {
    return new Item(this.id, this.name, this.icon, this.desc, this.state.states)
  }

}

export default Item
