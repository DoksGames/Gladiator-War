let player;
let player2;
let ground;
let img;
let img2;
let imgground;
let imgbackground;
let bullets = [];
let gameendsound;
let hitsound;
let knifesound;
let gamesound;
let i = 0;
let s = 0;
let order66;
let imgpalpatine;
let palpatine;
let startgame = false;
let imgGladiator;
let imgSanta;
let switch1;
let switch2;

function preload() {
  img = loadImage("./Gladiator.png");
  imgground = loadImage("./ArenaGround.png");
  img2 = loadImage("./Weihnachtsmann.png");
  imgbackground = loadImage("./Desert.png");
  gameendsound = loadSound("./GameOver.mp3");
  hitsound = loadSound("./hit1.mp3");
  knifesound = loadSound("./Knifesound.wav");
  gamesound = loadSound("./NanoBeats.ogg");
  order66 = loadSound("./order66.mp3");
  imgpalpatine = loadImage("./Palpatine.png");
  imgGladiator = loadImage("./Gladiator2.png");
  imgSanta = loadImage("./Weihnachtsmann.png");
}

function setup() {
  createCanvas(850, 500);
  switch1 = img;
  switch2 = img2;

  player = new Player(switch1, 0, "gladiator");
  player2 = new Player(switch2, 500, "weihnachtsmann");
  ground = new Ground(imgground);
  bullet = new Bullet();
  palpatine = new Palps(imgpalpatine);
  player.xmove = "right";
  player2.xmove = "right";
  //bullets.push(new Bullet(50, 50, 1))
  //bullets.push(new Bullet(500, 50, -1))
  //bullets.push(new Bullet(700, 50, -1))
}

function draw() {
  background(imgbackground);
  ground.paint();
  if (startgame === false) {
    fill("Black");
    textSize(40);
    textAlign(RIGHT);
    text("Drücke Enter zum Start", 625, 250);
    player.bulletmove = 20;
    player2.bulletmove = -20;
  }
  if (startgame) {
    i = i + 1;

    if (player.Move >= player2.Move) {
      player.bulletmove = -20;
      player2.bulletmove = 20;
    } else {
      player.bulletmove = 20;
      player2.bulletmove = -20;
    }

    if (player.livepoint >= 1) {
      player.paint();
      player.move();
      player.combatsystem();
    }
    if (player2.livepoint >= 1) {
      player2.paint();
      player2.move();
      player2.combatsystem();
    }

    bullet.draw();
    bullet.move();
    if (i <= 100) {
      gameendsound.stop();
      fill("Black");
      textSize(50);
      textAlign(RIGHT);
      text("START", 500, 250);
      text(i, 450, 300);
    }

    if (i >= 100) {
      if (player.energie <= 200) {
        player.energie = player.energie + 2;
      }
      if (player2.energie <= 200) {
        player2.energie = player2.energie + 2;
      }

      fill("Black");
      textSize(11);
      textAlign(RIGHT);
      text("Übrige Schüsse: " + player.bulletpoints, 100, 100);
      text("Energie: " + player.energie, 100, 120);

      fill("Black");
      textSize(11);
      textAlign(RIGHT);
      text("Übrige Schüsse: " + player2.bulletpoints, 800, 100);
      text("Energie: " + player2.energie, 800, 120);

      //if (keyIsDown(54)) {
      //palpatine.paint();
      //}

      //Anzeige Player 1
      if (player.Jump <= -400) {
        player.livepoint = 0;
      }
      fill("Black");
      textSize(11);
      textAlign(RIGHT);
      text("Leben: " + player.livepoint, 100, 50);

      //Anzeige Player 2
      if (player2.Jump <= -400) {
        player2.livepoint = 0;
      }

      fill("Black");
      textSize(11);
      textAlign(RIGHT);
      text("Leben: " + player2.livepoint, 800, 50);
      if (player.livepoint <= 0 && player2.livepoint >= 1) {
        fill("Black");
        textSize(50);
        textAlign(RIGHT);
        text("Der Weihnachtsmann gewinnt !!!", 775, 250);
        text("Escape für nächste Runde", 700, 300);
        s = s + 1;
        if (s === 1) {
          gamesound.stop();
          gameendsound.play();
        }
      }
      if (player2.livepoint <= 0 && player.livepoint >= 1) {
        fill("Black");
        textSize(50);
        textAlign(RIGHT);
        text("Der Gladiator gewinnt !!!", 700, 250);
        text("Escape für nächste Runde", 725, 300);
        s = s + 1;
        if (s === 1) {
          gamesound.stop();
          gameendsound.play();
        }
      }

      //Movement Player 1
      if (keyIsDown(65)) {
        // D
        player.Move = player.Move - 5;
        player.xmove = "right";
      }
      if (player.Move <= -105) {
        player.state = "downfinal";
      }
      if (player.Move >= 630) {
        player.state = "downfinal";
      }
      if (keyIsDown(68)) {
        //A
        player.Move = player.Move + 5;
        player.xmove = "left";
      }

      //Movement Player 2
      if (keyIsDown(76)) {
        // L
        player2.Move = player2.Move - 5;
        player2.xmove = "right";
      }
      if (player2.Move <= -105) {
        player2.state = "downfinal";
      }
      if (player2.Move >= 630) {
        player2.state = "downfinal";
      }
      if (keyIsDown(222)) {
        //Ä
        player2.Move = player2.Move + 5;
        player2.xmove = "left";
      }
    }
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].move();
      bullets[i].draw();
      if (bullets[i].collide(player)) {
        player.livepoint = player.livepoint - 1;
        hitsound.play();
        player.Move = player.Move + player2.bulletmove * 3;
        player2.Punkte = player2.Punkte + 1;
      }
      if (bullets[i].collide(player2)) {
        player2.livepoint = player2.livepoint - 1;
        hitsound.play();
        player2.Move = player2.Move + player.bulletmove * 3;
        player.Punkte = player.Punkte + 1;
      }
    }
    if (player.bulletpoints === 0 && player2.bulletpoints === 0) {
      textSize(40);
      textAlign(RIGHT);
      text("Unentschieden !!!", 585, 250);
      text("Escape für nächste Runde", 675, 300);
      s = s + 1;
      if (s === 1) {
        gamesound.stop();
        gameendsound.play();
      }
    }
    if (player.livepoint <= 0 && player2.livepoint <= 0) {
      textSize(40);
      textAlign(RIGHT);
      text("Unentschieden !!!", 585, 250);
      text("Escape für nächste Runde", 675, 300);
      s = s + 1;
      if (s === 1) {
        gamesound.stop();
        gameendsound.play();
      }
    }
  }
}
//Tastenabfrage
function keyPressed() {
  console.log(keyCode);
  if (i >= 100) {
    if (keyCode === 32) {
      //Leertaste
      player.startJump();
    }
    if (keyCode === 18) {
      //AltGr
      player2.startJump();
    }
    if (keyCode === 87) {
      // W
      player.startfightW();
      player2.startfightW();
    }
    if (keyCode === 69) {
      // E
      //player.startfightE()
      //player2.startfightE()
      bullet = new Bullet();
      if (player.bulletpoints >= 1 && player.energie >= 100) {
        knifesound.play();
        bullets.push(
          new Bullet(
            player.Move + 150 + 30,
            255 - player.Jump + 50,
            player.bulletmove,
            "gladiator"
          )
        );
        player.bulletpoints = player.bulletpoints - 1;
        player.energie = player.energie - 100;
      }
    }
    if (keyCode === 80) {
      // P
      //player.startfightE()
      //player2.startfightE()
      bullet = new Bullet();
      if (player2.bulletpoints >= 1 && player2.energie >= 100) {
        knifesound.play();
        bullets.push(
          new Bullet(
            player2.Move + 150 + 30,
            255 - player2.Jump + 50,
            player2.bulletmove,
            "weihnachtsmann"
          )
        );
        player2.bulletpoints = player2.bulletpoints - 1;
        player2.energie = player2.energie - 100;
      }
    }
    if (keyCode === 27) {
      gamesound.stop();
      gamesound.play();
      i = 0;
      s = 0;
      createCanvas(850, 500);
      background(imgbackground);
      player = new Player(img, 0, "gladiator");
      player2 = new Player(img2, 500, "weihnachtsmann");
      ground = new Ground(imgground);
      bullet = new Bullet();
      player.xmove = "right";
      player2.xmove = "right";
      player.livepoint = 10;
      player.bulletpoints = 20;
      player.bulletmove = -15;
      player.energie = 0;

      player2.livepoint = 10;
      player2.bulletpoints = 20;
      player2.bulletmove = -15;
      player2.energie = 0;
    }
  }
  if (keyCode === 13) {
    startgame = true;
    gamesound.stop();
    gamesound.play();
  }
  //if (keyCode === 54) {
  //gamesound.stop();
  //order66.stop();
  //order66.play();
  //}
}
