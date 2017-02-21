class GooseGame {
  constructor () {
    this.players = []
    this.positions = []
  }

  addPlayer (name) {
    if (this.players.includes(name)) {
      return `${name}: Giocatore già presente`
    }
    this.players.push(name)
    this.positions.push(0)

    return `Giocatori: ${this.players.join(', ')}`
  }

  movePlayer (playerName, firstDice, secondDice) {
    let position = this._getPlayerPositionBy(playerName)
    let end = position + firstDice + secondDice

    this._setPlayerPositionBy(playerName, end)

    let start = (position === 0) ? 'Partenza' : position
    return `${playerName} tira ${firstDice}, ${secondDice}. ${playerName} muove da ${start} a ${end}`
  }

  _getPlayerPositionBy (name) {
    return this.positions[this.players.indexOf(name)]
  }

  _setPlayerPositionBy (name, value) {
    this.positions[this.players.indexOf(name)] = value
  }
}

module.exports = {
  GooseGame
}
