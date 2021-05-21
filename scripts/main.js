var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    backgroundColor: "#2d2d2d",
    scene: {
      preload: preload,
      create: create
    },
  };
  
  var game = new Phaser.Game(config);
  var scene;
  var coin;
  var canClick = true;

  function preload() {
    this.load.spritesheet("coin", "../assets/coin.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }
  
  function create() {
    scene = this;
    coin = this.add.sprite(300,200,"coin",0);
    this.input.on("pointerdown", toss, this);
  }

  function selectFace() {
    let newValue = Phaser.Math.Between(0, 1);
    coin.setTexture('coin',newValue);
  }

  function toss() {
    if(!canClick) {
      return;
    }
    canClick = false;
    this.tweens.add({
      targets: coin,
      y:150,
      scaleY:0.1,
      duration: 400,
      onComplete: function(event, sprite){
        selectFace();
        scene.tweens.add({
          targets: sprite,
          y:200,
          scaleY:1,
          duration: 400,
          onComplete: function(event, sprite){
            canClick = true;
          }
        });
      }
    });
    
  }