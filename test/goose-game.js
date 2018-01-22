const { equal } = require('assert')
const GooseGame = require('../lib/goose-game')

test('GooseGame', () => {
  test('adds first player', () => {
    var game = new GooseGame()
    var response = game.send('add player Pippo')

    equal(response, 'players: Pippo')
  })

  test('adds two players player', () => {
    var game = new GooseGame()
    game.send('add player Pippo')
    var response = game.send('add player Pluto')

    equal(response, 'players: Pippo, Pluto')
  })
})
