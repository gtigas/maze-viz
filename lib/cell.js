class Cell {
  constructor(pos, x, y, ctx, maze){
    this.created = false;
    this.visited = false;
    this.path = false;
    this.start = false;
    this.end = false;
    this.pos = pos;
    this.parent = null;
    this.xPosRender = x;
    this.yPosRender = y;
    this.i = 1;
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

  unvisitedNeighbors(type){
    return this.neighbors().filter( neighbor => {
      return neighbor[type] === false
    });
  }
  mazeNeighbors(){
    return this.neighbors().filter( neighbor => {
      return neighbor.created === true
    });
  }

  unvisitedConnectedCells(){
    return this.connectedCells.filter( neighbor => {
      return neighbor.visited === false
    });
  }

  connectPath(otherCell){
    this.connectedCells.push(otherCell)
    otherCell.connectedCells.push(this)
  }

  draw(){
    if (this.created) {
      this.ctx.fillStyle = 'white'
    } else {
      this.ctx.fillStyle = "rgba(0, 0, 200, 0)"
    }
    if (this.visited) {
      const g = 240 - Math.floor(this.i * 0.439)
      const b =  Math.floor(this.i * 0.439)
      const r = Math.floor(this.i * 0.14)
      this.ctx.fillStyle = `rgba(${r},${g},${b},1)`
    }
    if (this.path) {
      this.ctx.fillStyle = 'yellow'
    }
    if (this.head) {
      this.ctx.fillStyle = 'red'
    }
    this._breakDownWalls();
    const cellSize = this.maze.opts.cellSize
    this.ctx.fillRect(this.xPosRender, this.yPosRender, cellSize, cellSize);
  }

  _breakDownWalls(){
    const { cellSize, wallSize } = this.maze.opts
    if (this._checkNeighborPath('S')) {
      this.ctx.fillRect(this.xPosRender, (this.yPosRender + cellSize), cellSize, wallSize);
    }
    if (this._checkNeighborPath('E')) {
      this.ctx.fillRect(this.xPosRender + cellSize, this.yPosRender, wallSize, cellSize);
    }
  }

  _checkNeighborPath(dir){
    const neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
    return this.connectedCells.some( cell => {
      return cell.pos.toString() === neighborPos.toString()
    })
  }

  _isInvalidPosition(pos){
    return ((pos[0] < 0 || pos[0] > (this.maze.height - 1)) || (pos[1] < 0 || pos[1] > (this.maze.width - 1)))
  }
}

const DIRS = {
  'N': [-1,0],
  'E': [0,1],
  'S': [1,0],
  'W': [0,-1],
}

export default Cell
