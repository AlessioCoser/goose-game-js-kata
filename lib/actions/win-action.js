module.exports = class WinAction {
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
