class ExitCommandHandler {
  handleCommand (command) {
    return command == 'exit'
  }

  execute (game, command) {
    process.exit(0)
  }

  help () {
    return ['exit - Esce dall\'applicazione']
  }
}

module.exports = new ExitCommandHandler()
