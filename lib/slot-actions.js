const Printer = require('./printer')

module.exports = {
  'default': (player, dicePair) => {
    player.moveTo(player.position() + dicePair[0] + dicePair[1])
    return [
      Printer.roll(player.name(), dicePair),
      Printer.move(player.name(), player.previousPosition(), player.position())
    ].join('. ')
  },
  'bounce': (player, dicePair) => {
    let nextStep = player.position() + dicePair[0] + dicePair[1]
    player.moveTo(63 + 63 - nextStep)

    return [
      Printer.roll(player.name(), dicePair),
      Printer.move(player.name(), player.previousPosition(), 63),
      Printer.bounce(player.name(), player.position())
    ].join('. ')
  },
  63: (player, dicePair) => {
    player.moveTo(player.position() + dicePair[0] + dicePair[1])
    return [
      Printer.roll(player.name(), dicePair),
      Printer.move(player.name(), player.previousPosition(), player.position()),
      Printer.win(player.name())
    ].join('. ')
  }
}
