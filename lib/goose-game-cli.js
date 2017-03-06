const CommandBus = require('./commands')
const GooseGame = require('./goose-game')

class GooseGameCli {
  constructor (prompt = require('prompt')) {
    this._prompt = prompt
    this._game = new GooseGame()
    this._commandBus = new CommandBus(this._game)
    this._prompt.start()
  }

  start () {
    this._runPrompt()
  }

  _runPrompt() {
    this._prompt.get(['command'], this._runCommand(this._runPrompt.bind(this)))
  }

  _runCommand (callback) {
    return (err, result) => {
      if (err) {
        return 1
      }

      let response = this._commandBus.execute(result.command)

      this._print(response)

      if(this._game.ended()) {
        this._commandBus.execute("exit")
      }

      callback()
    }
  }

  _print(response) {
    console.log(response)
  }
}

module.exports = GooseGameCli
