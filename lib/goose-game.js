const Players = require('./players')

class GooseGame {
  constructor (players = new Players()) {
    this._players = players
  }

  send (cmd) {
    let name = this.parsePlayerName(cmd)

    if (this._players.exists(name)) {
      return name + ': already existing player'
    }

    this._players.add(name)

    return 'players: ' + this._players.all().join(', ')
  }

  parsePlayerName (cmd) {
    return cmd.split('add player').join('').trim()
  }
}

module.exports = GooseGame
