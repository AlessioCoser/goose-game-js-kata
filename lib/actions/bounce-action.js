module.exports = class BounceAction {
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
