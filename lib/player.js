class Player {
  constructor(name) {
    this._name = name
    this._position = 0
    this._previousPosition = null
  }

  name () {
    return this._name
  }

  previousPosition () {
    return this._previousPosition
  }

  position () {
    return this._position
  }

  moveTo (position) {
    this._previousPosition = this._position
    this._position = position
  }
}

module.exports = Player
