import { Component } from '../component'

class Items extends Component {

  constructor (items) {
    super()
    this.items = items || {}
  }

  item (item) {
    return this.items[this.itemId(item)]
  }

  itemId (item) {
    return _.isString(item) ? item : item.id
  }

  isEmpty () {
    return _.isEmpty(this.items)
  }

  has (item) {
    return !_.isUndefined(this.item(item))
  }

  add (item, qty = 1) {
    this.qty(item, this.qty(item) + qty)
    return this
  }

  remove (item, qty) {
    this.qty(item, _.isUndefined(qty) ? 0 : this.qty(item) - qty)
    return this
  }

  qty (item, qty) {
    var id = this.itemId(item)
    var i = this.item(item)
    if (!i) {
      i = { item, qty }
      this.items[id] = i
      this.emit('add', id)
    }
    i.qty = Math.max(0, qty)
    this.emit('qty', id)
    i.emit('qty', qty)
    if (i.qty === 0) {
      i.emit('remove')
      this.emit('remove', id)
      delete this.items[id]
      return 0
    } else {
      return i.qty
    }
  }

}

export default Items
