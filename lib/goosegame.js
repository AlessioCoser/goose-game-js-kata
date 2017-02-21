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

  moveBy (steps) {
    this._previousPosition = this._position
    this._position = this._position + steps
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

    return `Giocatori: ${this._printPlayers()}`
  }

  movePlayer (playerName, firstDice, secondDice) {
    let player = this._getPlayer(playerName)

    player.moveBy(firstDice + secondDice)

    let start = (player.previousPosition() === 0) ? 'Partenza' : player.previousPosition()

    return `${playerName} tira ${firstDice}, ${secondDice}. ` +
           `${playerName} muove da ${start} a ${player.position()}`
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

  _printPlayers () {
    return this.players.map(player => player.name()).join(', ')
  }
}

module.exports = {
  GooseGame
}
