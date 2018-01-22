const Players = require('./players')
const Printer = require('./printer')

class GooseGame {
  constructor (players = new Players(), printer = new Printer()) {
    this._players = players
    this._printer = printer
  }

  send (cmd) {
    if (cmd.indexOf('add player ') === 0) {
      var name = this.parseAddPlayerName(cmd)

      if (this._players.add(name)) {
        return this._printer.playerList(this._players.allNames())
      }

      return this._printer.playerExistsError(name)
    }

    if (cmd.indexOf('move ') === 0) {
      let [playerName, dice] = this.parseMovePlayer(cmd)

      let player = this._players.find(playerName)

      return this._printer.move(player, dice)
    }
  }

  parseAddPlayerName (cmd) {
    return cmd.split('add player').join('').trim()
  }

  parseMovePlayer (cmd) {
    let [_, playerName, ...dice] = cmd.match(/move ([a-zA-Z]+) ([0-6]), ([0-6])/i)
    return [playerName, dice]
  }
}

module.exports = GooseGame
