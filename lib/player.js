class Player {
  constructor (name) {
    this._position = 0
    this._name = name
  }

  name () {
    return this._name
  }

  position () {
    return this._position
  }

  move (dice) {
    this._position += this._diceSum(dice)
  }

  _diceSum (dice) {
    return parseInt(dice[0]) + parseInt(dice[1])
  }
}

module.exports = Player
