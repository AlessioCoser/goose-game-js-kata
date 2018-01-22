class DefaultAction {
  constructor (printer) {
    this._printer = printer
  }

  canBeTriggered (dice, player) {
    return player.position() < 63
  }

  trigger (dice, player) {
    return this._printer.move(player.name(), player.previous(), player.position(), dice)
  }
}

class WinAction {
  constructor (printer) {
    this._printer = printer
  }

  canBeTriggered (dice, player) {
    return player.position() === 63
  }

  trigger (dice, player) {
    return this._printer.win(player.name(), player.previous(), player.position(), dice)
  }
}

module.exports = class Actions {
  constructor (printer) {
    this._actions = [
      new WinAction(printer),
      new DefaultAction(printer)
    ]
  }

  trigger (dice, player) {
    return this._actions.find((action) => action.canBeTriggered(dice, player))
      .trigger(dice, player)
  }
}
