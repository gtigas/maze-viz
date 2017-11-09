class Cell {
  constructor(pos, x, y, ctx, maze){
    this.visited = false;
    this.pos = pos;
    this.xPosRender = x;
    this.yPosRender = y;
    this.connectedCells = [];
    this.ctx = ctx;
    this.maze = maze;
    this.neighbors = this.neighbors.bind(this)
    this._checkNeighborPath = this._checkNeighborPath.bind(this)
    this._breakDownWalls = this._breakDownWalls.bind(this)
  }

  neighbors(){
    const neighbors = [];
    Object.keys(DIRS).forEach( dir =>{
      let neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
      if (this._isInvalidPosition(neighborPos)) return;

      let neighbor = this.maze.getCell(neighborPos);
      neighbors.push(neighbor)
    });

    return neighbors
  }

  unvisitedNeighbors(){
    return this.neighbors().filter( neighbor => {
      return neighbor.visited === false
    });
  }

  connectPath(otherCell){
    this.connectedCells.push(otherCell)
    otherCell.connectedCells.push(this)
  }

  draw(){
    if (this.visited) {
      this.ctx.fillStyle = 'white'
    } else {
      this.ctx.fillStyle = 'grey'
    }
    if (this.head) {
      this.ctx.fillStyle = 'yellow'
    }
    this.ctx.fillRect(this.xPosRender, this.yPosRender, 20, 20);
    this._breakDownWalls();
  }

  _breakDownWalls(){
    this.ctx.fillStyle = 'white'
    if (this._checkNeighborPath('S')) {
      this.ctx.fillRect(this.xPosRender, (this.yPosRender + 20), 20, 20);
    }
    if (this._checkNeighborPath('E')) {
      this.ctx.fillRect(this.xPosRender + 20, this.yPosRender, 20, 20);
    }
  }

  _checkNeighborPath(dir){
    const neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
    return this.connectedCells.some( cell => {
      return cell.pos.toString() === neighborPos.toString()
    })
  }

  _isInvalidPosition(pos){
    return ((pos[0] < 0 || pos[0] > 18) || (pos[1] < 0 || pos[1] > 30))
  }
}

const DIRS = {
  'N': [-1,0],
  'E': [0,1],
  'S': [1,0],
  'W': [0,-1],
}

export default Cell
