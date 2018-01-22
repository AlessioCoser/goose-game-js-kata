module.exports = class MovePlayerCommand {
  constructor (players, printer) {
    this._players = players
    this._printer = printer
    this._expression = /move ([a-zA-Z]+) ([0-6]), ([0-6])/i
  }

  canHandle (command) {
    return this._expression.test(command)
  }

  execute (command) {
    let [_, name, ...dice] = this._expression.exec(command)

    let player = this._players.find(name)

    let prevPos = (player.position() === 0) ? 'Start' : player.position()

    player.move(this._sum(dice))

    if (player.hasWon()) {
      return this._printer.win(player, prevPos, dice)
    }

    if (player.hasBounced()) {
      player.bounce()

      return this._printer.bounce(player, prevPos, dice)
    }

    return this._printer.move(player, prevPos, dice)
  }

  _sum (dice) {
    return parseInt(dice[0]) + parseInt(dice[1])
  }
}
