import { Exit } from './exit'
import { State } from '../state'

class Door extends Exit {

  constructor (room, direction = 'N', targetRoom, states) {
    super(room, direction, targetRoom, states)
    this.state = new State(states)
  }

  isOpened () {
    return this.state.has('open')
  }

  isClosed () {
    return !this.state.has('open')
  }

  isLocked () {
    return this.state.has('lock')
  }

  isUnlocked () {
    return !this.state.has('lock')
  }

  unlock (withItem) {
    if (this.isLocked()) {
      this.state.unset('lock')
    } else {

    }
    return this
  }

  lock (withItem) {
    if (this.isUnlocked()) {
      this.state.set('lock')
    } else {

    }
    return this
  }

  open () {
    if (this.isClosed()) {
      if (this.isUnlocked()) {
        this.state.set('open')
      } else {

      }
    } else {

    }
    return this
  }

  close () {
    if (this.isOpened()) {
      this.state.unset('open')
    } else {

    }
    return this
  }

}

export default Door
