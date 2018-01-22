class Player {
  constructor (name) {
    this._position = 0
    this._name = name
    this._winPosition = 63
  }

  winPosition () {
    return this._winPosition
  }

  hasWon () {
    return this.position() === this._winPosition
  }

  hasBounced () {
    return this.position() > this._winPosition
  }

  name () {
    return this._name
  }

  position () {
    return this._position
  }

  move (number) {
    this._position += number
  }

  bounce () {
    this.move((this._winPosition - this.position()) * 2)
  }
}

module.exports = Player
