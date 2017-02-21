class GooseGame {
  constructor() {
    this.players = []
  }

  addPlayer(name) {
    this.players.push(name)

    return `Giocatori: ${this.players.join(', ')}`
  }
}

module.exports = {
  GooseGame
}
