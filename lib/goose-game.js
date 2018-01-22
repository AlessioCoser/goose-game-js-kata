const Players = require('./players')

class GooseGame {
  constructor (players = new Players()) {
    this._players = players
  }

  send (cmd) {
    if (cmd.indexOf('add player ') === 0) {
      var name = this.parseAddPlayerName(cmd)

      if (this._players.add(name)) {
        return this.printPlayerList(this._players.all())
      }

      return this.printPlayerExistsError(name)
    }

    if (cmd.indexOf('move ') === 0) {
      var [_, playerName, ...dice] = this.parseMovePlayer(cmd)

      return `${playerName} rolls ${dice[0]}, ${dice[1]}. ` +
             `${playerName} moves from Start to ${this.diceSum(dice)}`
    }
  }

  diceSum (dice) {
    return parseInt(dice[0]) + parseInt(dice[1])
  }

  parseAddPlayerName (cmd) {
    return cmd.split('add player').join('').trim()
  }

  parseMovePlayer (cmd) {
    return cmd.match(/move ([a-zA-Z]+) ([0-6]), ([0-6])/i)
  }

  printPlayerList (players) {
    return 'players: ' + players.join(', ')
  }

  printPlayerExistsError (player) {
    return player + ': already existing player'
  }
}

module.exports = GooseGame
