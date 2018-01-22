module.exports = class NotFoundCommand {
  constructor (printer) {
    this._printer = printer
  }

  canHandle (command) {
    return true
  }

  execute (command) {
    return this._printer.commandNotFound()
  }
}
