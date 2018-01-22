class Printer {
  playerList (players) {
    return 'players: ' + players.join(', ')
  }

  playerExistsError (player) {
    return player + ': already existing player'
  }

  move (player, dice) {
    let prevPos = (player.position() === 0) ? 'Start' : player.position()

    player.move(dice)

    return `${player.name()} rolls ${dice[0]}, ${dice[1]}. ` +
           `${player.name()} moves from ${prevPos} to ${player.position()}`
  }

  commandNotFound () {
    return 'This command was not found'
  }
}

module.exports = Printer
