import { Component } from './component'

class Position extends Component {

  constructor (x, y) {
    super()
    this.x = x
    this.y = y
  }

  move (x, y) {
    if (x instanceof Position) {
      this.x = x.x
      this.y = x.y
    } else {
      this.x = x
      this.y = y
    }
    return this
  }

  add (x, y) {
    if (x instanceof Position) {
      this.x += x.x
      this.y += x.y
    } else {
      this.x += x
      this.y += y
    }
    return this
  }

  sub (x, y) {
    if (x instanceof Position) {
      this.x -= x.x
      this.y -= x.y
    } else {
      this.x -= x
      this.y -= y
    }
    return this
  }

  mul (x, y) {
    if (x instanceof Position) {
      this.x *= x.x
      this.y *= x.y
    } else {
      this.x *= x
      this.y *= y
    }
    return this
  }

  div (x, y) {
    if (x instanceof Position) {
      this.x /= x.x
      this.y /= x.y
    } else {
      this.x /= x
      this.y /= y
    }
    return this
  }

  eq (x, y) {
    if (x instanceof Position) {
      return this.x === x.x && this.y === x.y
    } else {
      return this.x === x && this.y === y
    }
  }

  ne (x, y) {
    if (x instanceof Position) {
      return this.x !== x.x && this.y !== x.y
    } else {
      return this.x !== x && this.y !== y
    }
  }

  gt (x, y) {
    if (x instanceof Position) {
      return this.x > x.x && this.y > x.y
    } else {
      return this.x > x && this.y > y
    }
  }

  ge (x, y) {
    if (x instanceof Position) {
      return this.x >= x.x && this.y >= x.y
    } else {
      return this.x >= x && this.y >= y
    }
  }

  lt (x, y) {
    if (x instanceof Position) {
      return this.x < x.x && this.y < x.y
    } else {
      return this.x < x && this.y < y
    }
  }

  le (x, y) {
    if (x instanceof Position) {
      return this.x <= x.x && this.y <= x.y
    } else {
      return this.x <= x && this.y <= y
    }
  }

  above (x, y) {
    if (x instanceof Position) {
      return this.y > x.y
    } else {
      return this.y > y
    }
  }

  beneath (x, y) {
    if (x instanceof Position) {
      return this.y < x.y
    } else {
      return this.y < y
    }
  }

  distance (x, y) {
    var dx
    var dy
    if (x instanceof Position) {
      dx = this.x - x.x
      dy = this.y - x.y
    } else {
      dx = this.x - x
      dy = this.y - y
    }
    return Math.sqrt(dx * dx + dy * dy)
  }

  distancesq (x, y) {
    var dx
    var dy
    if (x instanceof Position) {
      dx = this.x - x.x
      dy = this.y - x.y
    } else {
      dx = this.x - x
      dy = this.y - y
    }
    return dx * dx + dy * dy
  }

  normalize () {
    var mag = this.magnitude()
    return new Position(this.x / mag, this.y / mag)
  }

  magnitude () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  magnitudesq () {
    return this.x * this.x + this.y * this.y
  }

  cross (x, y) {
    if (x instanceof Position) {
      return this.x * x.y - this.y * x.x
    } else {
      return this.x * y - this.y * x
    }
  }

  dot (x, y) {
    if (x instanceof Position) {
      return this.x * x.x + this.y * x.y
    } else {
      return this.x * x + this.y * y
    }
  }

  angle (x, y) {
    var p
    if (x instanceof Position) {
      p = x.x
    } else {
      p = new Position(x, y)
    }
    return Math.atan2(p.cross(this), p.dot(this))
  }

  update (x, y) {
    if (x instanceof Position) {
      this.x = x.x
      this.y = x.y
    } else {
      this.x = x
      this.y = y
    }
    return this
  }

  clone () {
    return new Position(this.x, this.y)
  }

  degreesTo (x, y) {
    var dx
    var dy
    if (x instanceof Position) {
      dx = this.x - x.x
      dy = this.y - x.y
    } else {
      dx = this.x - x
      dy = this.y - y
    }
    return Math.atan2(dy, dx) * (180 / Math.PI)
  }

  interpolate (x, y, f) {
    if (x instanceof Position) {
      return new Position((this.x + x.x) * f, (this.y + x.y) * f)
    } else {
      return new Position((this.x + x) * f, (this.y + y) * f)
    }
  }

  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  toString () {
    return '(x=' + this.x + ', y=' + this.y + ')'
  }

}

export default Position
