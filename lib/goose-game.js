const Players = require('./players')

class GooseGame {
  constructor (players = new Players()) {
    this._players = players
  }

  send (cmd) {
    if (cmd.indexOf('add player ') === 0) {
      var name = this.parseAddPlayerName(cmd)

      if (this._players.add(name)) {
        return this.printPlayerList(this._players.allNames())
      }

      return this.printPlayerExistsError(name)
    }

    if (cmd.indexOf('move ') === 0) {
      let [playerName, dice] = this.parseMovePlayer(cmd)

      let player = this._players.find(playerName)

      return this.printPlayerMove(player, dice)
    }
  }

  parseAddPlayerName (cmd) {
    return cmd.split('add player').join('').trim()
  }

  parseMovePlayer (cmd) {
    let [_, playerName, ...dice] = cmd.match(/move ([a-zA-Z]+) ([0-6]), ([0-6])/i)
    return [playerName, dice]
  }

  printPlayerList (players) {
    return 'players: ' + players.join(', ')
  }

  printPlayerExistsError (player) {
    return player + ': already existing player'
  }

  printPlayerMove (player, dice) {
    let prevPos = (player.position() === 0) ? 'Start' : player.position()

    player.move(dice)

    return `${player.name()} rolls ${dice[0]}, ${dice[1]}. ` +
           `${player.name()} moves from ${prevPos} to ${player.position()}`
  }
}

module.exports = GooseGame
