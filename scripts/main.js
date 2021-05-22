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
  var currentFace = 0;
  var coin;
  var canClick = true;

  function preload() {
    this.load.spritesheet("coin", "https://game-awake.github.io/Toss-a-coin/assets/coin.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }
  
  function create() {
    scene = this;
    coin = this.add.sprite(300,200,"coin",currentFace);
    this.input.on("pointerdown", toss, this);
  }

  function getFace() {
    return Phaser.Math.Between(0, 1);
  }


  function enableCanClick() {
    canClick = true;
  }

  function changeSpriteFace() {
    currentFace = 1 - currentFace;
    coin.setTexture('coin',currentFace);
  }

  function createTween(y,scaleY,onComplete) {
    return {
      y: y,
      scaleY: scaleY,
      onComplete: onComplete,
      targets: coin,
      duration: 150,
   };
  }

  function toss() {
    if(!canClick) {
      return;
    }
    canClick = false;
    let timeLine = this.tweens.createTimeline();       

    let newValue = getFace();

    let posY = 200;
    for(let i=1;i<=3;i++) {
      posY -= 25;
      timeLine.add(createTween(posY,0.1,changeSpriteFace));
      posY -= 25;
      timeLine.add(createTween(posY,1));
    }
    for(let i=1;i<=2;i++) {
      posY += 25;
      timeLine.add(createTween(posY,0.1,changeSpriteFace));
      posY += 25;
      timeLine.add(createTween(posY,1));
    }
    if(currentFace == newValue) {
      posY += 25;
      timeLine.add(createTween(posY,0.1,changeSpriteFace));
      posY += 25;
      timeLine.add(createTween(posY,1,enableCanClick));
    } else {
      posY += 25;
      timeLine.add(createTween(posY,1));
      posY += 25;
      timeLine.add(createTween(posY,1,enableCanClick));
    }

   timeLine.play();
    
  }