const WinAction = require('./win-action')
const BounceAction = require('./bounce-action')
const DefaultAction = require('./default-action')

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
