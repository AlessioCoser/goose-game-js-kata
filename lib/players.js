const Player = require('./player')

class Players {
  constructor () {
    this._players = []
  }

  all () {
    return this._players
  }

  allNames () {
    return this._players.map((player) => player.name())
  }

  add (name) {
    if (this.exists(name)) {
      return false
    }

    this._players.push(new Player(name))
    return true
  }

  find (name) {
    if (!this.exists(name)) {
      return false
    }

    return this.all().filter((player) => player.name() === name)[0]
  }

  exists (name) {
    return this.all().some((player) => player.name() === name)
  }
}

module.exports = Players
