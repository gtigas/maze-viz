class Cell {
  constructor(pos, x, y, ctx, maze){
    this.visited = false;
    this.pos = pos;
    this.xPosRender = x;
    this.yPosRender = y;
    this.ctx = ctx;
    this.maze = maze;
    this.ctx.fillRect(x, y, 20, 20);
  }

  neighbors(){
    const DIRS = {
      'N': [1,0],
      'E': [0,1],
      'S': [-1,0],
      'W': [0,-1],
    }
    const neighbors = [];
    Object.keys(DIRS).forEach( dir =>{
      let neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
      if ((neighborPos[0] < 0 || neighborPos[0] > 18) ||
          (neighborPos[1] < 0 || neighborPos[1] > 30)  ) {
        return
      }
      let neighbor = this.maze.getCell(neighborPos);
      neighbors.push(neighbor)
    });

    return neighbors
  }
}

export default Cell
