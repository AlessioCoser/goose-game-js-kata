class GooseGame {
  constructor () {
    this.players = []
  }

  addPlayer (name) {
    if (this.players.includes(name)) {
      return `${name}: Giocatore già presente`
    }
    this.players.push(name)

    return `Giocatori: ${this.players.join(', ')}`
  }

  movePlayer (playerName, firstDice, secondDice) {
    return `${playerName} tira ${firstDice}, ${secondDice}. ${playerName} muove da Partenza a ${firstDice + secondDice}`
  }
}

module.exports = {
  GooseGame
}
