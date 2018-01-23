class DefaultAction {
  constructor (printer) {
    this._printer = printer
  }

  canBeTriggered (dice, player) {
    return player.position() + parseInt(dice[0]) + parseInt(dice[1]) < player.winPosition()
  }

  trigger (dice, player) {
    player.move(parseInt(dice[0]) + parseInt(dice[1]))

    return this._printer.move(player.name(), player.previous(), player.position(), dice)
  }
}

class WinAction {
  constructor (printer) {
    this._printer = printer
  }

  canBeTriggered (dice, player) {
    return player.position() + parseInt(dice[0]) + parseInt(dice[1]) === player.winPosition()
  }

  trigger (dice, player) {
    player.move(parseInt(dice[0]) + parseInt(dice[1]))

    return this._printer.win(player.name(), player.previous(), player.position(), dice)
  }
}

class BounceAction {
  constructor (printer) {
    this._printer = printer
  }

  canBeTriggered (dice, player) {
    return player.position() + parseInt(dice[0]) + parseInt(dice[1]) > player.winPosition()
  }

  trigger (dice, player) {
    let nextSlot = player.position() + parseInt(dice[0]) + parseInt(dice[1])
    let toAddFromWinPosition = player.winPosition() - nextSlot
    let missToWin = (player.winPosition() - player.position())

    player.move(toAddFromWinPosition + missToWin)

    return this._printer.bounce(player.name(), player.previous(), player.winPosition(), player.position(), dice)
  }
}

module.exports = class Actions {
  constructor (printer) {
    this._actions = [
      new WinAction(printer),
      new BounceAction(printer),
      new DefaultAction(printer)
    ]
  }

  trigger (dice, player) {
    return this._actions.find((action) => action.canBeTriggered(dice, player))
      .trigger(dice, player)
  }
}
