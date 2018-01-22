class Players {
  constructor () {
    this._players = []
  }

  all () {
    return this._players
  }

  add (player) {
    this._players.push(player)
  }

  exists (player) {
    return this.all().some((p) => p === player)
  }
}

module.exports = Players
