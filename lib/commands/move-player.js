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
    let previousPosition = (player.position() === 0) ? 'Start' : player.position()

    player.move(this._sum(dice))

    if (player.hasWon()) {
      return this._printer.win(player.name(), previousPosition, player.position(), dice)
    }

    if (player.hasBounced()) {
      player.bounce()

      return this._printer.bounce(player.name(), previousPosition, player.winPosition(), player.position(), dice)
    }

    return this._printer.move(player.name(), previousPosition, player.position(), dice)
  }

  _sum (dice) {
    return parseInt(dice[0]) + parseInt(dice[1])
  }
}
