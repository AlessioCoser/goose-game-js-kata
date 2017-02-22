const Printer = {
  roll: function (playerName, firstDice, secondDice) {
    return `${playerName} tira ${firstDice}, ${secondDice}`
  },
  move: function (playerName, previousPosition, currentPosition) {
    let start = (previousPosition === 0) ? 'Partenza' : previousPosition

    return `${playerName} muove da ${start} a ${currentPosition}`
  },
  win: function (playerName) {
    return `${playerName} vince!!`
  },
  bounce: function (playerName, position) {
    return `${playerName} rimbalza! ${playerName} torna a ${position}`
  },
  alreadyExists: function (playerName) {
    return `${playerName}: Giocatore già presente`
  },
  allPlayers: function (players) {
    return `Giocatori: ${players.join(', ')}`
  }
}

const SlotActions = {
  'default': (player, firstDice, secondDice) => {
    player.moveTo(player.position() + firstDice + secondDice)
    return [
      Printer.roll(player.name(), firstDice, secondDice),
      Printer.move(player.name(), player.previousPosition(), player.position())
    ].join('. ')
  },
  'bounce': (player, firstDice, secondDice) => {
    let nextStep = player.position() + firstDice + secondDice
    player.moveTo(63 + 63 - nextStep)

    return [
      Printer.roll(player.name(), firstDice, secondDice),
      Printer.move(player.name(), player.previousPosition(), 63),
      Printer.bounce(player.name(), player.position())
    ].join('. ')
  },
  63: (player, firstDice, secondDice) => {
    player.moveTo(player.position() + firstDice + secondDice)
    return [
      Printer.roll(player.name(), firstDice, secondDice),
      Printer.move(player.name(), player.previousPosition(), player.position()),
      Printer.win(player.name())
    ].join('. ')
  }
}

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
  }

  addPlayer (name) {
    if (this._hasPlayer(name)) {
      return Printer.alreadyExists(name)
    }
    this.players.push(new Player(name))

    return Printer.allPlayers(this._playersNames())
  }

  movePlayer (playerName, firstDice, secondDice) {
    let player = this._getPlayer(playerName)

    let nextSlot = player.position() + firstDice + secondDice

    if (nextSlot > 63) {
      return SlotActions['bounce'](player, firstDice, secondDice)
    }

    if (SlotActions[nextSlot]) {
      return SlotActions[nextSlot](player, firstDice, secondDice)
    }

    return SlotActions['default'](player, firstDice, secondDice)
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
}

module.exports = {
  GooseGame
}
