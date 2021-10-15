class Bullet {
  constructor(startX, startY, direction, owner) {
    // Musst du noch machen: richtung je nach bewegung drehen
    this.x = startX;
    this.y = startY;
    this.active = true;
    this.owner = owner;
    this.direction = direction;
  }
  draw() {
    //image(this.imgmesser, this.x, this.y);
    circle(this.x, this.y, 5);
  }
  move() {
    this.x = this.x + this.direction;
  }

  collide(player) {
    if (player.name === this.owner) return false;
    if (this.active === false) return false;

    let playerX = 150 + player.Move;
    let playerY = 255 - player.Jump;

    let collidesOnX = playerX <= this.x && this.x <= playerX + 80;

    let collidesOnY = playerY <= this.y && this.y <= playerY + 100;
    let isColliding = collidesOnX && collidesOnY;
    if (isColliding) {
      this.active = false;
    }
    return isColliding;
  }

  isOutsideCanvas() {
    if (this.x <= -70) {
      return true;
    } else {
      return false;
    }
  }
}
