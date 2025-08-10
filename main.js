let player;
let coin;
let score = 0;
let scoreText;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('coin', 'assets/coin.png');
}

function create() {
    player = this.physics.add.sprite(400, 300, 'player');
    coin = this.physics.add.sprite(200, 200, 'coin');
    
    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff'
    });

    this.physics.add.overlap(player, coin, collectCoin, null, this);
}

function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    
    if (cursors.left.isDown) {
        player.x -= 5;
    }
    if (cursors.right.isDown) {
        player.x += 5;
    }
    if (cursors.up.isDown) {
        player.y -= 5;
    }
    if (cursors.down.isDown) {
        player.y += 5;
    }
}

function collectCoin(player, coin) {
    score += 10;
    scoreText.setText('Score: ' + score);
    coin.x = Phaser.Math.Between(50, 750);
    coin.y = Phaser.Math.Between(50, 550);
}
