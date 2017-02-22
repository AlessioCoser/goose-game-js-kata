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
    this._position = this._position + position
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

    player.moveTo(firstDice + secondDice)

    if (this._hasWon(player)) {
      return [this._printRoll(player, firstDice, secondDice), this._printMove(player), this._printWin(player)].join('. ')
    }

    return [this._printRoll(player, firstDice, secondDice), this._printMove(player)].join('. ')
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

  _hasWon (player) {
    return player.position() === 63
  }

  _playersNames () {
    return this.players.map(player => player.name())
  }

  _printRoll (player, firstDice, secondDice) {
    return `${player.name()} tira ${firstDice}, ${secondDice}`
  }

  _printMove (player) {
    let start = (player.previousPosition() === 0) ? 'Partenza' : player.previousPosition()

    return `${player.name()} muove da ${start} a ${player.position()}`
  }

  _printWin (player) {
    return `${player.name()} vince!!`
  }
}

module.exports = {
  GooseGame
}
