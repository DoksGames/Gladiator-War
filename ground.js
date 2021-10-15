class Ground{
  constructor(imgground, brand){
    this.imgground = imgground;
    this.brand = brand
  }
  paint() {
    image(this.imgground,99, 355 ) // 702, 600
  } 
}