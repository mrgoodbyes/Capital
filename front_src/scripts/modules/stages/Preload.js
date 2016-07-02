import socket from '../socket'
import game from '../game'

export default class {
  preload () {
    // show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar')
    this.preloadBar.anchor.setTo(0.5)

    this.load.setPreloadSprite(this.preloadBar)

    // load game assets
    this.load.tilemap('level1', 'tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTiles', 'images/tiles.png')
    this.load.image('greencup', 'images/greencup.png')
    this.load.image('bluecup', 'images/bluecup.png')
    this.load.image('player', 'images/player.png')
    this.load.image('browndoor', 'images/browndoor.png')
  }

  create () {
    socket.init().then(() => {
      socket.onDisconnect = game.pause.bind(game)
      socket.onReconnect = game.unPause.bind(game)

      this.state.start('Game')
    })
  }
}
