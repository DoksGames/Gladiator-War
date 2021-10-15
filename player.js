class Player {
  constructor(img, startX, name) {
    this.img = img;
    this.Jump = -7;
    this.Move = startX;
    this.livepoint = 10;
    this.bulletpoints = 25;
    this.bulletmove = 0;
    this.energie = 0;
    this.name = name;
    this.Punkte = 0;
    this.state = "standing"; // standing, up, down
    this.xmove = "standing"; // standing, left, right
    this.fight = "piece"; // piece, box, knife
  }

  //Character skin
  paint(img) {
    image(this.img, 150 + this.Move, 255 - this.Jump);
  }

  //Start something
  startJump() {
    if (this.state === "standing") {
      this.state = "up";
    }
  }
  startfightW() {
    this.fight = "box";
  }
  startfightE() {
    this.fight = "knife";
  }

  // Move and fight System
  move() {
    switch (this.state) {
      case "up":
        if (this.Jump >= 150) {
          this.state = "down";
        }
        this.Jump = this.Jump + 7;
        break;

      case "down":
        if (this.Jump <= 0) {
          this.state = "standing";
        }
        this.Jump = this.Jump - 8;
        break;
      case "downfinal":
        this.Jump = this.Jump - 10;
        break;

      case "standing":
        break;

      default:
        break;
    }
  }
  combatsystem() {
    switch (this.fight) {
      case "box":
        break;
      case "knife":
        break;
      case "piece":
        break;

      default:
        break;
    }
  }
}
