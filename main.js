let player;
let coin;
let score = 0;
let scoreText;
let cursors;

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
    // No assets to load — we'll make shapes
}

function create() {
    // Create player (blue square)
    player = this.add.rectangle(400, 300, 40, 40, 0x0000ff);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    // Create coin (yellow circle)
    coin = this.add.circle(200, 200, 15, 0xffff00);
    this.physics.add.existing(coin);

    // Score text
    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff'
    });

    // Enable collision detection
    this.physics.add.overlap(player, coin, collectCoin, null, this);

    // Enable arrow key input
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Reset velocity
    player.body.setVelocity(0);

    if (cursors.left.isDown) {
        player.body.setVelocityX(-200);
    }
    if (cursors.right.isDown) {
        player.body.setVelocityX(200);
    }
    if (cursors.up.isDown) {
        player.body.setVelocityY(-200);
    }
    if (cursors.down.isDown) {
        player.body.setVelocityY(200);
    }
}

function collectCoin(player, coin) {
    score += 10;
    scoreText.setText('Score: ' + score);

    // Move coin to random position
    coin.x = Phaser.Math.Between(50, 750);
    coin.y = Phaser.Math.Between(50, 550);
}
