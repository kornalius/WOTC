import { Item } from './item'

class Equip extends Item {

  isEquipped () {
    return this.state.has('equip')
  }

  equip () {
    if (!this.isEquipped()) {
      this.state.set('equip')
    } else {

    }
    return this
  }

  unequip () {
    if (this.isEquipped()) {
      this.state.unset('equip')
    } else {

    }
    return this
  }

}

export default Equip
