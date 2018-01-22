class GooseGame {
  constructor () {
    this._players = []
  }

  send (cmd) {
    let name = this.parsePlayerName(cmd)

    if (this.playerExists(name)) {
      return name + ': already existing player'
    }

    this.playersAdd(name)
    return 'players: ' + this.players().join(', ')
  }

  playersAdd (player) {
    return this._players.push(player)
  }

  players () {
    return this._players
  }

  playerExists (name) {
    return this.players().some((player) => player === name)
  }

  parsePlayerName (cmd) {
    return cmd.split('add player').join('').trim()
  }
}

module.exports = GooseGame
