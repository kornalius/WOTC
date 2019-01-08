import { Component } from '../component'

class Dialog extends Component {

  constructor (parent, words) {
    super()
    this.parent = parent
    this.words = words || {}
  }

  hasAnswer (word) {
    return !_.isUndefined(this.words[word.toLowerCase()])
  }

  answer (word) {
    if (this.hasAnswer(word)) {
      this.say(this.words[word.toLowerCase()])
    } else {
      this.say()
    }
  }

  say (text) {

  }

}

export default Dialog
