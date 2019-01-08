import Emitter from 'smelly-event-emitter'

class Component extends Emitter {

  constructor () {
    super()
    this.name = this.constructor.name.toLowerCase()
  }

  preUpdate () {
  }

  postUpdate () {
  }

  update (elapsed) {
    this.preUpdate()
    _.forOwn(this, (v) => {
      if (_.isFunction(v.update)) {
        v.update(elapsed)
      }
    })
    this.postUpdate()
    return this
  }

}

export default Component
