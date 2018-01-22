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

    return this._printer.move(player, dice)
  }
}
