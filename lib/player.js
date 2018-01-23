class Player {
  constructor (name) {
    this._previous = 0
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

  previous () {
    return this._previous
  }

  move (number) {
    this._previous = this._position
    this._position += number
  }
}

module.exports = Player
