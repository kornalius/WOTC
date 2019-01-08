import { Items } from '../items/items'

class Inventory extends Items {

  constructor (parent, items) {
    super(items)
    this.parent = parent
  }

}

export default Inventory
