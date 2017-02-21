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

  test('message error when player already exists', function () {
    let game = new GooseGame()
    game.addPlayer('Pippo')

    equal(game.addPlayer('Pippo'), 'Pippo: Giocatore già presente')
  })

  test('move a player from Partenza', function () {
    let game = new GooseGame()
    game.addPlayer('Pippo')

    var moveResponse = game.movePlayer('Pippo', 4, 2)
    equal(moveResponse, 'Pippo tira 4, 2. Pippo muove da Partenza a 6')
  })

  test('move a player from previous position', function () {
    let game = new GooseGame()
    game.addPlayer('Pippo')
    game.movePlayer('Pippo', 2, 3)

    var moveResponse = game.movePlayer('Pippo', 2, 2)
    equal(moveResponse, 'Pippo tira 2, 2. Pippo muove da 5 a 9')
  })
})
