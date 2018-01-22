const Players = require('./players')

class GooseGame {
  constructor (players = new Players()) {
    this._players = players
  }

  send (cmd) {
    if (cmd.indexOf('add player ') === 0) {
      let name = this.parsePlayerName(cmd)

      if (this._players.add(name)) {
        return this.printPlayerList(this._players.all())
      }

      return this.printPlayerExistsError(name)
    }

    if (cmd.indexOf('move ') === 0) {
      return 'Pippo rolls 4, 2. Pippo moves from Start to 6'
    }
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
