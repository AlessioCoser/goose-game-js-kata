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

  test('returns error if a player already exists', () => {
    var game = new GooseGame()
    game.send('add player Pippo')
    var response = game.send('add player Pippo')

    equal(response, 'Pippo: already existing player')
  })

  test('move player from the beginning', () => {
    var game = new GooseGame()
    game.send('add player Pippo')

    let response = game.send('move Pippo 4, 2')

    equal(response, 'Pippo rolls 4, 2. Pippo moves from Start to 6')
  })
})
