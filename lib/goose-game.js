const Printer = require('./printer')
const Players = require('./players')
const Actions = require('./actions')

class GooseGame {
  constructor (printer = new Printer(), players = new Players()) {
    this._printer = printer
    this._players = players
    this._actions = new Actions(this._printer)
  }

  send (cmd) {
    let addExpr = /add player ([a-zA-Z]+)/i
    if (addExpr.test(cmd)) {
      let [_, name] = addExpr.exec(cmd)

      return this.addPlayer(name)
    }

    let moveExpr = /move ([a-zA-Z]+) ([0-6]), ([0-6])/i
    if (moveExpr.test(cmd)) {
      let [_, name, ...dice] = moveExpr.exec(cmd)

      return this.movePlayer(name, dice)
    }

    return ''
  }

  addPlayer (name) {
    if (this._players.add(name)) {
      return this._printer.playerList(this._players.allNames())
    }

    return this._printer.playerExistsError(name)
  }

  movePlayer (name, dice) {
    let player = this._players.find(name)
    let previousPosition = (player.position() === 0) ? 'Start' : player.position()

    player.move(this._sum(dice))

    if (player.hasWon()) {
      return this._printer.win(player.name(), previousPosition, player.position(), dice)
    }

    if (player.hasBounced()) {
      player.bounce()

      return this._printer.bounce(player.name(), previousPosition, player.winPosition(), player.position(), dice)
    }

    return this._actions.trigger(dice, player)
  }

  _sum (dice) {
    return parseInt(dice[0]) + parseInt(dice[1])
  }
}

module.exports = GooseGame
