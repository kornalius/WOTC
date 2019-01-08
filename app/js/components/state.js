import { Component } from './component'

class State extends Component {

  constructor (states = {}) {
    super()
    this.states = states
  }

  has (name) {
    return !_.isUndefined(this.states[name])
  }

  set (name) {
    this.states[name] = true
  }

  unset (name) {
    delete this.states[name]
  }

}

export default State
