const {equal} = require('assert')
const {GooseGame} = require('../lib/goosegame')

test('GooseGame', function () {
  test('add player to game', function () {
    let game = new GooseGame()

    equal(game.addPlayer('Pippo'), 'Giocatori: Pippo')
  })
  test('add another player to game', function () {
    let game = new GooseGame()
    game.addPlayer('Pippo')

    equal(game.addPlayer('Pluto'), 'Giocatori: Pippo, Pluto')
  })
})
