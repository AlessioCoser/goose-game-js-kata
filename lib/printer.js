module.exports = {
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
