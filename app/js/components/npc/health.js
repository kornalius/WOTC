import { Component } from '../component'

class Health extends Component {

  constructor (parent, maxHealth) {
    super()
    this.parent = parent
    this.health = this.maxHealth = maxHealth
  }

  isAlive () { return this.health > 0 }

  isDead () { return this.health <= 0 }

  receiveDamage (damage) {
    this.health -= damage

    if (this.isDead()) {
      this.emit('die')
    }
  }

}

export default Health
