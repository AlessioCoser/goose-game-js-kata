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

  hasWon () {
    return this._position === 63
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

    if (player.hasWon()) {
      return this._printRollPlayer(player, firstDice, secondDice) +
             this._printMovePlayer(player) +
             `. ${playerName} vince!!`
    }

    return this._printRollPlayer(player, firstDice, secondDice) +
           this._printMovePlayer(player)
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

  _printRollPlayer (player, firstDice, secondDice) {
    return `${player.name()} tira ${firstDice}, ${secondDice}. `
  }

  _printMovePlayer (player) {
    let start = (player.previousPosition() === 0) ? 'Partenza' : player.previousPosition()

    return `${player.name()} muove da ${start} a ${player.position()}`
  }
}

module.exports = {
  GooseGame
}
