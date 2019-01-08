import { Component } from '../component'
import { State } from '../state'
import { Dialog } from './dialog'
import { Inventory } from './inventory'

class Npc extends Component {

  constructor (name, desc, image, words, items, states) {
    super()
    this.name = name
    this.desc = desc
    this.image = image
    this.inventory = new Inventory(this, items)
    this.state = new State(states)
    this.dialog = new Dialog(this, words)
  }

}

export default Npc
