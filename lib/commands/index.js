const commandHandlers = [
  require('./exit'),
  require('./add-player'),
  require('./move-player')
]

class CommandBus {
  constructor(gooseGame) {
    this._gooseGame = gooseGame
  }

  execute(command) {
    let commandHandler = this._findBy(command)

    if (undefined == commandHandler) {
      return this._printHelp()
    }

    return commandHandler.execute(this._gooseGame, command)
  }

  _findBy(command) {
    return commandHandlers.find((commandHandler) => {
      return commandHandler.handleCommand(command)
    })
  }

  _printHelp() {
    const helps = commandHandlers.map((commandHandler) => {
      return commandHandler.help().join('\n')
    }).join('\n')

    return helps
  }
}

module.exports = CommandBus
