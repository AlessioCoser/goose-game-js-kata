const Player = require('./player')
const SlotActions = require('./slot-actions')
const Printer = require('./printer')

class GooseGame {
  constructor () {
    this.players = []
  }

  addPlayer (name) {
    if (this._hasPlayer(name)) {
      return Printer.alreadyExists(name)
    }
    this.players.push(new Player(name))

    return Printer.allPlayers(this._playersNames())
  }

  movePlayer (playerName, dicePair) {
    let player = this._getPlayer(playerName)

    if (!player) {
      return Printer.notExists(playerName)
    }

    let nextSlot = player.position() + dicePair[0] + dicePair[1]

    if (this._isOverLastSlot(nextSlot)) {
      return SlotActions['bounce'](player, dicePair)
    }

    if (SlotActions[nextSlot]) {
      return SlotActions[nextSlot](player, dicePair)
    }

    return SlotActions['default'](player, dicePair)
  }

  ended () {
    return this.players.some(player => player.position() === 63)
  }

  _isOverLastSlot(slot) {
    return slot > 63
  }

  _getPlayer (name) {
    return this.players.reduce((acc, player) => {
      if (name === player.name()) {
        return player
      }
      return acc
    }, null)
  }

  _hasPlayer (name) {
    return this.players.some(player => name === player.name())
  }

  _playersNames () {
    return this.players.map(player => player.name())
  }
}

module.exports = GooseGame
