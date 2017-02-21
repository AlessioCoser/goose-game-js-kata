class Player {
  constructor(name) {
    this._name = name
    this._position = 0
  }

  name () {
    return this._name
  }

  position () {
    return this._position
  }

  moveTo (position) {
    this._position = position
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
    let position = player.position()
    let end = position + firstDice + secondDice

    player.moveTo(end)

    let start = (position === 0) ? 'Partenza' : position
    return `${playerName} tira ${firstDice}, ${secondDice}. ${playerName} muove da ${start} a ${end}`
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
