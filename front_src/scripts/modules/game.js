import Boot from './stages/Boot';
import Preload from './stages/Preload';
import Game from './stages/Game';

export default {
    game: {},
    init: function() {
        this.game = new Phaser.Game(160, 160, Phaser.AUTO, '');

        this.game.state.add('Boot', Boot);
        this.game.state.add('Preload', Preload);
        this.game.state.add('Game', Game);

        this.game.state.start('Boot');
    }
};
