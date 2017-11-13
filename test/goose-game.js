const { equal } = require('assert')
const GooseGame = require('../lib/goose-game')

test('adds first player', () => {
  var game = new GooseGame()
  var response = game.send('add player Pippo')

  equal(response, 'players: Pippo')
})
