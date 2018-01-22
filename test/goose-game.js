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

  test('move player from another position', () => {
    var game = new GooseGame()
    game.send('add player Pippo')

    game.send('move Pippo 4, 2')
    let response = game.send('move Pippo 2, 3')

    equal(response, 'Pippo rolls 2, 3. Pippo moves from 6 to 11')
  })

  test('player wins the game', () => {
    var game = new GooseGame()
    game.send('add player Pippo')

    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    let response = game.send('move Pippo 1, 2')

    equal(response, 'Pippo rolls 1, 2. Pippo moves from 60 to 63. Pippo Wins!!')
  })

  test('player wins with the exact dice shooting', () => {
    var game = new GooseGame()
    game.send('add player Pippo')

    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    game.send('move Pippo 6, 6')
    let response = game.send('move Pippo 3, 2')

    equal(response, 'Pippo rolls 3, 2. Pippo moves from 60 to 63. Pippo bounces! Pippo returns to 61')
  })
})
