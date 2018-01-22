class Players {
  constructor () {
    this._players = []
  }

  all () {
    return this._players
  }

  add (player) {
    if (this.exists(player)) {
      return false
    }

    this._players.push(player)
    return true
  }

  exists (player) {
    return this.all().some((p) => p === player)
  }
}

module.exports = Players
