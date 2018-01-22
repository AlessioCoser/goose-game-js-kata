module.exports = class AddPlayerCommand {
  constructor (players, printer) {
    this._players = players
    this._printer = printer
    this._expression = /add player ([a-zA-Z]+)/i
  }

  canHandle (command) {
    return this._expression.test(command)
  }

  execute (command) {
    let [_, name] = this._expression.exec(command)

    if (this._players.add(name)) {
      return this._printer.playerList(this._players.allNames())
    }

    return this._printer.playerExistsError(name)
  }
}
