class Player {
  constructor(name) {
    this._name = name
    this._position = 0
    this._previousPosition = null
  }

  name () {
    return this._name
  }

  previousPosition () {
    return this._previousPosition
  }

  position () {
    return this._position
  }

  moveTo (position) {
    this._previousPosition = this._position
    this._position = position
  }
}

class GooseGame {
  constructor () {
    this.players = []
    this.slotActions = {
      'default': (player, firstDice, secondDice) => {
        player.moveTo( player.position() + firstDice + secondDice)
        return [
          this._printRoll(player, firstDice, secondDice),
          this._printMove(player)
        ].join('. ')
      },
      'bounce': (player, firstDice, secondDice) => {
        let nextStep = player.position() + firstDice + secondDice
        player.moveTo(63 + 63 - nextStep)

        return [
          this._printRoll(player, firstDice, secondDice),
          `${player.name()} muove da ${player.previousPosition()} a 63`,
          this._printBounce(player)
        ].join('. ')
      },
      63: (player, firstDice, secondDice) => {
        player.moveTo(player.position() + firstDice + secondDice)
        return [
          this._printRoll(player, firstDice, secondDice),
          this._printMove(player),
          this._printWin(player)
        ].join('. ')
      }
    }
  }

  addPlayer (name) {
    if (this._hasPlayer(name)) {
      return `${name}: Giocatore già presente`
    }
    this.players.push(new Player(name))

    return `Giocatori: ${this._playersNames().join(', ')}`
  }

  movePlayer (playerName, firstDice, secondDice) {
    let player = this._getPlayer(playerName)

    let nextSlot = player.position() + firstDice + secondDice

    if (this.slotActions[nextSlot]) {
      return this.slotActions[nextSlot](player, firstDice, secondDice)
    }

    if (nextSlot > 63) {
      return this.slotActions['bounce'](player, firstDice, secondDice)
    }

    return this.slotActions['default'](player, firstDice, secondDice)
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

  _hasWon (player) {
    return player.position() === 63
  }

  _playersNames () {
    return this.players.map(player => player.name())
  }

  _printRoll (player, firstDice, secondDice) {
    return `${player.name()} tira ${firstDice}, ${secondDice}`
  }

  _printMove (player) {
    let start = (player.previousPosition() === 0) ? 'Partenza' : player.previousPosition()

    return `${player.name()} muove da ${start} a ${player.position()}`
  }

  _printWin (player) {
    return `${player.name()} vince!!`
  }

  _printBounce (player) {
    return `${player.name()} rimbalza! ${player.name()} torna a ${player.position()}`
  }
}

module.exports = {
  GooseGame
}
