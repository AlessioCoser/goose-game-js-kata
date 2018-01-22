const Players = require('./players')

class GooseGame {
  constructor (players = new Players()) {
    this._players = players
  }

  send (cmd) {
    let name = this.parsePlayerName(cmd)

    if (this._players.add(name)) {
      return this.printPlayerList(this._players.all())
    }

    return this.printPlayerExistsError(name)
  }

  parsePlayerName (cmd) {
    return cmd.split('add player').join('').trim()
  }

  printPlayerList (players) {
    return 'players: ' + players.join(', ')
  }

  printPlayerExistsError (player) {
    return player + ': already existing player'
  }
}

module.exports = GooseGame
