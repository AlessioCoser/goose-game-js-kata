class Printer {
  playerList (players) {
    return 'players: ' + players.join(', ')
  }

  playerExistsError (player) {
    return player + ': already existing player'
  }

  win (player, previousPosition, dice) {
    return this.move(player, previousPosition, dice) + `. ${player.name()} Wins!!`
  }

  move (player, previousPosition, dice) {
    return `${player.name()} rolls ${dice[0]}, ${dice[1]}. ` +
           `${player.name()} moves from ${previousPosition} to ${player.position()}`
  }

  commandNotFound () {
    return 'This command was not found'
  }
}

module.exports = Printer
