/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_game2.default.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Boot = __webpack_require__(2);

	var _Boot2 = _interopRequireDefault(_Boot);

	var _Preload = __webpack_require__(3);

	var _Preload2 = _interopRequireDefault(_Preload);

	var _Game = __webpack_require__(4);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    game: {},
	    init: function init() {
	        this.game = new Phaser.Game(160, 160, Phaser.AUTO, '');

	        this.game.state.add('Boot', _Boot2.default);
	        this.game.state.add('Preload', _Preload2.default);
	        this.game.state.add('Game', _Game2.default);

	        this.game.state.start('Boot');
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TopDownGame = TopDownGame || {};

	TopDownGame.Boot = function () {};

	//setting game configuration and loading the assets for the loading screen
	TopDownGame.Boot.prototype = {
	  preload: function preload() {
	    //assets we'll use in the loading screen
	    this.load.image('preloadbar', 'images/preloader-bar.png');
	  },
	  create: function create() {
	    //loading screen will have a white background
	    this.game.stage.backgroundColor = '#fff';

	    //scaling options
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	    //have the game centered horizontally
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

	    //physics system
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    this.state.start('Preload');
	  }
	};

	exports.default = TopDownGame.Boot;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TopDownGame = TopDownGame || {};

	//loading the game assets
	TopDownGame.Preload = function () {};

	TopDownGame.Preload.prototype = {
	  preload: function preload() {
	    //show loading screen
	    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
	    this.preloadBar.anchor.setTo(0.5);

	    this.load.setPreloadSprite(this.preloadBar);

	    //load game assets
	    this.load.tilemap('level1', 'tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
	    this.load.image('gameTiles', 'images/tiles.png');
	    this.load.image('greencup', 'images/greencup.png');
	    this.load.image('bluecup', 'images/bluecup.png');
	    this.load.image('player', 'images/player.png');
	    this.load.image('browndoor', 'images/browndoor.png');
	  },
	  create: function create() {
	    this.state.start('Game');
	  }
	};

	exports.default = TopDownGame.Preload;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TopDownGame = TopDownGame || {};

	//title screen
	TopDownGame.Game = function () {};

	TopDownGame.Game.prototype = {
	  create: function create() {
	    this.map = this.game.add.tilemap('level1');

	    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	    this.map.addTilesetImage('tiles', 'gameTiles');

	    //create layer
	    this.backgroundlayer = this.map.createLayer('backgroundLayer');
	    this.blockedLayer = this.map.createLayer('blockedLayer');

	    //collision on blockedLayer
	    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

	    //resizes the game world to match the layer dimensions
	    this.backgroundlayer.resizeWorld();

	    this.createItems();
	    this.createDoors();

	    //create player
	    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
	    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
	    this.game.physics.arcade.enable(this.player);

	    //the camera will follow the player in the world
	    this.game.camera.follow(this.player);

	    //move player with cursor keys
	    this.cursors = this.game.input.keyboard.createCursorKeys();
	  },
	  createItems: function createItems() {
	    //create items
	    this.items = this.game.add.group();
	    this.items.enableBody = true;
	    var item;
	    var result = this.findObjectsByType('item', this.map, 'objectsLayer');
	    result.forEach(function (element) {
	      this.createFromTiledObject(element, this.items);
	    }, this);
	  },
	  createDoors: function createDoors() {
	    //create doors
	    this.doors = this.game.add.group();
	    this.doors.enableBody = true;
	    var result = this.findObjectsByType('door', this.map, 'objectsLayer');

	    result.forEach(function (element) {
	      this.createFromTiledObject(element, this.doors);
	    }, this);
	  },

	  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
	  findObjectsByType: function findObjectsByType(type, map, layer) {
	    var result = new Array();
	    map.objects[layer].forEach(function (element) {
	      if (element.properties.type === type) {
	        //Phaser uses top left, Tiled bottom left so we have to adjust
	        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
	        //so they might not be placed in the exact position as in Tiled
	        element.y -= map.tileHeight;
	        result.push(element);
	      }
	    });
	    return result;
	  },
	  //create a sprite from an object
	  createFromTiledObject: function createFromTiledObject(element, group) {
	    var sprite = group.create(element.x, element.y, element.properties.sprite);

	    //copy all properties to the sprite
	    Object.keys(element.properties).forEach(function (key) {
	      sprite[key] = element.properties[key];
	    });
	  },
	  update: function update() {
	    //collision
	    this.game.physics.arcade.collide(this.player, this.blockedLayer);
	    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
	    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

	    //player movement

	    this.player.body.velocity.x = 0;

	    if (this.cursors.up.isDown) {
	      if (this.player.body.velocity.y == 0) this.player.body.velocity.y -= 50;
	    } else if (this.cursors.down.isDown) {
	      if (this.player.body.velocity.y == 0) this.player.body.velocity.y += 50;
	    } else {
	      this.player.body.velocity.y = 0;
	    }
	    if (this.cursors.left.isDown) {
	      this.player.body.velocity.x -= 50;
	    } else if (this.cursors.right.isDown) {
	      this.player.body.velocity.x += 50;
	    }
	  },
	  collect: function collect(player, collectable) {
	    console.log('yummy!');

	    //remove sprite
	    collectable.destroy();
	  },
	  enterDoor: function enterDoor(player, door) {
	    console.log('entering door that will take you to ' + door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
	  }
	};

	exports.default = TopDownGame.Game;

/***/ }
/******/ ]);