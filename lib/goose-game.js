class GooseGame {
  constructor () {
    this._players = []
  }

  send (cmd) {
    let name = this.parsePlayerName(cmd)
    this.playersAdd(name)

    return 'players: ' + this.players().join(', ')
  }

  playersAdd (player) {
    return this._players.push(player)
  }

  players () {
    return this._players
  }

  parsePlayerName (cmd) {
    return cmd.split('add player').join('').trim()
  }
}

module.exports = GooseGame
