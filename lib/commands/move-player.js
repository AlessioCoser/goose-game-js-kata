class MovePlayerCommandHandler {
  constructor() {
    this._regexpr = /^Muovi ([a-zA-Z]+) ([0-6]), ([0-6])/
  }

  handleCommand (command) {
    return this._regexpr.test(command)
  }

  execute (game, command) {
    let name = this._extractNameFrom(command)
    let dicePair = this._extractDicePairFrom(command)

    return game.movePlayer(name, dicePair)
  }

  help () {
    return ['Muovi <Nome> <0-6>, <0-6> - Muove il giocatore della somma dei due dadi']
  }

  _extractDicePairFrom(command) {
    let pieces = this._regexpr.exec(command)

    return [parseInt(pieces[2]), parseInt(pieces[3])]
  }

  _extractNameFrom(command) {
    let pieces = this._regexpr.exec(command)

    return pieces[1]
  }
}

module.exports = new MovePlayerCommandHandler()
