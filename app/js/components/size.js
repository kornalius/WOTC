import { Component } from './component'
import { Position } from './position'

class Size extends Component {

  constructor (w, h) {
    super()
    this.w = w
    this.h = h
  }

  get width () { return this.w }
  set width (w) { this.w = w }

  get height () { return this.h }
  set height (h) { this.h = h }

  get left () { return this.x }
  set left (x) { this.x = x }

  get right () { return this.x + this.w }
  set right (x2) { this.w = x2 - this.x }

  get top () { return this.y }
  set top (y) { this.y = y }

  get bottom () { return this.y + this.h }
  set bottom (y2) { this.h = y2 - this.y }

  get topLeft () { return new Position(this.x, this.y) }
  set topLeft (x) {
    this.x = x.x
    this.y = x.y
  }

  get topRight () { return new Position(this.x + this.w, this.y) }
  set topRight (x) {
    this.w = x.x - this.x
    this.y = x.y
  }

  get bottomLeft () { return new Position(this.x, this.y + this.h) }
  set bottomLeft (x) {
    this.x = x.x
    this.h = x.y - this.y
  }

  get bottomRight () { return new Position(this.x + this.w, this.y + this.h) }
  set bottomRight (x) {
    this.w = x.x - this.x
    this.h = x.y - this.y
  }

  get halfWidth () { return Math.floor(this.w / 2) }

  get halfHeight () { return Math.floor(this.h / 2) }

  get center () { return new Position(this.x + this.halfWidth(), this.y + this.halfHeight()) }

  get centerLeft () { return new Position(this.x, this.y + this.halfHeight()) }

  get centerRight () { return new Position(this.x + this.w, this.y + this.halfHeight()) }

  get centerTop () { return new Position(this.x + this.halfWidth(), this.y) }

  get centerBottom () { return new Position(this.x + this.halfWidth(), this.y + this.h) }

  add (x, y, w, h) {
    if (x instanceof Size) {
      this.x -= x.x
      this.y -= x.y
      this.w -= x.w
      this.h -= x.h
    } else {
      this.x -= x
      this.y -= y
      this.w -= w
      this.h -= h
    }
    return this
  }

  sub (x, y, w, h) {
    if (x instanceof Size) {
      this.x -= x.x
      this.y -= x.y
      this.w -= x.w
      this.h -= x.h
    } else {
      this.x -= x
      this.y -= y
      this.w -= w
      this.h -= h
    }
    return this
  }

  mul (x, y, w, h) {
    if (x instanceof Size) {
      this.x *= x.x
      this.y *= x.y
      this.w *= x.w
      this.h *= x.h
    } else {
      this.x *= x
      this.y *= y
      this.w *= w
      this.h *= h
    }
    return this
  }

  div (x, y, w, h) {
    if (x instanceof Size) {
      this.x /= x.x
      this.y /= x.y
      this.w /= x.w
      this.h /= x.h
    } else {
      this.x /= x
      this.y /= y
      this.w /= w
      this.h /= h
    }
    return this
  }

  update (x, y, w, h) {
    if (x instanceof Size) {
      this.x = x.x
      this.y = x.y
      this.w = x.w
      this.h = x.h
    } else {
      this.x = x
      this.y = y
      this.w = w
      this.h = h
    }
    return this
  }

  move (x, y) {
    this.x = x
    this.y = y
    return this
  }

  moveBy (x, y) {
    return this.add(x, y)
  }

  scale (s) {
    this.w *= s
    this.h *= s
    return this
  }

  inflate (w, h) {
    var c = this.center()
    this.x = c.x - Math.floor(w / 2)
    this.y = c.y - Math.floor(h / 2)
    this.w = w
    this.h = h
    return this
  }

  resize (w, h) {
    this.w = w
    this.h = h
    return this
  }

  clone () {
    return new Size(this.x, this.y, this.w, this.h)
  }

  equals (x, y, w, h) {
    if (x instanceof Size) {
      return this.x === x.x && this.y === x.y && this.w === x.w && this.h === x.h
    } else {
      return this.x === x && this.y === y && this.w === w && this.h === h
    }
  }

  interpolate (v, f) {
    return new Size((this.x + v.x) * f, (this.y + v.y) * f, (this.w + v.w) * f, (this.h + v.h) * f)
  }

  length () {
    return Math.sqrt(this.w * this.w + this.h * this.h)
  }

  offset (dx, dy) {
    this.x += dx
    this.y += dy
    return this
  }

  contains (other) {
    if (other instanceof Size) {
      return other.x >= this.x && other.right() <= this.right() && other.y >= this.y && other.bottom() <= this.bottom()
    } else if (other instanceof Position) {
      return this.x <= other.x && other.x < this.right() && this.y <= other.y && other.y < this.bottom()
    } else {
      return false
    }
  }

  isEmpty () {
    return this.w === 0 && this.h === 0
  }

  isSquare () {
    return this.w === this.h
  }

  aspectRatio () {
    return this.w / this.h
  }

  area () {
    return this.w * this.h
  }

  perimeter () {
    return this.w * 2 + this.h * 2
  }

  union (otherRect) {
    var l1 = this.x
    var l2 = otherRect.x
    var r1 = l1 + this.w
    var r2 = l2 + otherRect.w
    var t1 = this.y
    var t2 = otherRect.y
    var b1 = t1 + this.h
    var b2 = t2 + otherRect.h

    var l = l1 < l2 ? l1 : l2
    var t = t1 < t2 ? t1 : t2
    var r = r1 > r2 ? r1 : r2
    var b = b1 > b2 ? b1 : b2

    return new Size(l, t, r - l, b - t)
  }

  intersect (rect) {
    var left
    var right
    var top
    var bottom

    var l1 = this.x
    var l2 = rect.x
    var r1 = this.x + this.w
    var r2 = rect.x + rect.w

    if (l2 >= r1) {
      return new Size()
    } else {
      left = l2 > l1 ? l2 : l1
    }

    if (r2 <= l1) {
      return new Size()
    } else {
      right = r2 > r1 ? r1 : r2
    }

    var t1 = this.y
    var t2 = rect.y
    var b1 = this.y + this.h
    var b2 = rect.y + rect.h

    if (t2 >= b1) {
      return new Size()
    } else {
      top = t2 > t1 ? t2 : t1
    }

    if (b2 <= t1) {
      return new Size()
    } else {
      bottom = b2 > b1 ? b1 : b2
    }

    return new Size(left, top, right - left, bottom - top)
  }

  toString () {
    return '(x=' + this.x + ', y=' + this.y + ', w=' + this.w + ', h=' + this.h + ')'
  }

}

export default Size
