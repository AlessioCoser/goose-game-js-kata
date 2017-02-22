const Printer = {
  roll: function (playerName, dicePair) {
    return `${playerName} tira ${dicePair[0]}, ${dicePair[1]}`
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
  'default': (player, dicePair) => {
    player.moveTo(player.position() + dicePair[0] + dicePair[1])
    return [
      Printer.roll(player.name(), dicePair),
      Printer.move(player.name(), player.previousPosition(), player.position())
    ].join('. ')
  },
  'bounce': (player, dicePair) => {
    let nextStep = player.position() + dicePair[0] + dicePair[1]
    player.moveTo(63 + 63 - nextStep)

    return [
      Printer.roll(player.name(), dicePair),
      Printer.move(player.name(), player.previousPosition(), 63),
      Printer.bounce(player.name(), player.position())
    ].join('. ')
  },
  63: (player, dicePair) => {
    player.moveTo(player.position() + dicePair[0] + dicePair[1])
    return [
      Printer.roll(player.name(), dicePair),
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

  movePlayer (playerName, dicePair) {
    let player = this._getPlayer(playerName)
    let nextSlot = player.position() + dicePair[0] + dicePair[1]

    if (nextSlot > 63) {
      return SlotActions['bounce'](player, dicePair)
    }

    if (SlotActions[nextSlot]) {
      return SlotActions[nextSlot](player, dicePair)
    }

    return SlotActions['default'](player, dicePair)
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

module.exports = {
  GooseGame
}
