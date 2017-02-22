class Player {
  constructor(name) {
    this._name = name
    this._position = 0
    this._previousPosition = null
    this._lastRoll = [0, 0]
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

  lastRoll () {
    return this._lastRoll
  }

  moveBy (firstDice, secondDice) {
    this._lastRoll = [firstDice, secondDice]
    this._previousPosition = this._position
    this._position = this._position + firstDice + secondDice
  }

  hasWon () {
    return this._position === 63
  }

  printRoll () {
    return `${this.name()} tira ${this.lastRoll().join(', ')}`
  }

  printMove () {
    let start = (this.previousPosition() === 0) ? 'Partenza' : this.previousPosition()

    return `${this.name()} muove da ${start} a ${this.position()}`
  }

  printWin () {
    return `${this.name()} vince!!`
  }
}

class GooseGame {
  constructor () {
    this.players = []
  }

  addPlayer (name) {
    if (this._hasPlayer(name)) {
      return `${name}: Giocatore già presente`
    }
    this.players.push(new Player(name))

    return `Giocatori: ${this._playersNames().join(', ')}`
  }

  movePlayer (playerName, firstDice, secondDice) {
    let player = this._getPlayer(playerName)

    player.moveBy(firstDice, secondDice)

    if (player.hasWon()) {
      return [player.printRoll(), player.printMove(), player.printWin()].join('. ')
    }

    return [player.printRoll(), player.printMove()].join('. ')
  }

  _getPlayer (name) {
    return this.players.reduce((acc, player) => {
      if (name === player.name()) {
        return player
      }
      return acc
    }, null)
  }

  _hasPlayer (name) {
    return this.players.some(player => name === player.name())
  }

  _playersNames () {
    return this.players.map(player => player.name())
  }
}

module.exports = {
  GooseGame
}
