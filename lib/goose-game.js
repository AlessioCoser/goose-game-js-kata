const Printer = require('./printer')
const Players = require('./players')
const AddPlayerCommand = require('./commands/add-player')
const MovePlayerCommand = require('./commands/move-player')
const NotFoundCommand = require('./commands/not-found')

class GooseGame {
  constructor (printer = new Printer(), players = new Players()) {
    this._printer = printer
    this._players = players

    this._commands = [
      new AddPlayerCommand(this._players, this._printer),
      new MovePlayerCommand(this._players, this._printer),
      new NotFoundCommand(this._printer)
    ]
  }

  send (commandString) {
    return this._commands
      .find((cmd) => cmd.canHandle(commandString))
      .execute(commandString)
  }
}

module.exports = GooseGame
