class AddPlayerCommandHandler {
  constructor() {
    this._regexpr = /^Aggiungi giocatore ([a-zA-Z]+)/
  }

  handleCommand (command) {
    return this._regexpr.test(command)
  }

  execute (game, command) {
    let name = this._extractNameFrom(command)

    return game.addPlayer(name)
  }

  help () {
    return ['Aggiungi giocatore <Nome> - Aggiunge il giocatore al gioco']
  }

  _extractNameFrom(command) {
    let pieces = this._regexpr.exec(command)

    return pieces[1]
  }
}

module.exports = new AddPlayerCommandHandler()
