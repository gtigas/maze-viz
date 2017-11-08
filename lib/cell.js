class Cell {
  constructor(x, y, ctx){
    this.visited = false;
    this.xPos = x;
    this.yPos = y;
    this.ctx = ctx;
    this.ctx.fillRect(x, y, 20, 20);
  }
}

export default Cell
