const CommandBus = require('./lib/commands')
const GooseGame = require('./lib/goosegame')

class Cli {
  constructor (prompt = require('prompt')) {
    this._prompt = prompt
    this._game = new GooseGame()
    this._commandBus = new CommandBus(this._game)
    this._prompt.start()
  }

  runPrompt () {
    this._prompt.get(['command'], this._runCommand(this.runPrompt.bind(this)))
  }

  _runCommand (callback) {
    return (err, result) => {
      if (err) {
        return 1
      }

      let response = this._commandBus.execute(result.command)

      if (response) {
        console.log(response)
      }

      if(this._game.ended()) {
        this._commandBus.execute("exit")
      }

      callback()
    }
  }
}

let cli = new Cli()
cli.runPrompt()
