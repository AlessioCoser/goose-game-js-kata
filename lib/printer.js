class Printer {
  playerList (players) {
    return 'players: ' + players.join(', ')
  }

  playerExistsError (player) {
    return player + ': already existing player'
  }

  move (playerName, previousPosition, newPosition, dice) {
    let prev = (previousPosition === 0) ? 'Start' : previousPosition

    return `${playerName} rolls ${dice[0]}, ${dice[1]}. ` +
           `${playerName} moves from ${prev} to ${newPosition}`
  }

  win (playerName, previousPosition, newPosition, dice) {
    return this.move(playerName, previousPosition, newPosition, dice) +
           `. ${playerName} Wins!!`
  }

  bounce (playerName, previousPosition, winPosition, newPosition, dice) {
    return this.move(playerName, previousPosition, winPosition, dice) +
           `. ${playerName} bounces! ${playerName} returns to ${newPosition}`
  }

  commandNotFound () {
    return 'This command was not found'
  }
}

module.exports = Printer
