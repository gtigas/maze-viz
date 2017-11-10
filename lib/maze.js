import Cell from './cell'

class Maze {
  constructor(ctx, size){
    this.opts = SIZE_OPTIONS[size]
    this.ctx = ctx
    this.width = this.opts.width
    this.height = this.opts.height
    this.getCell = this.getCell.bind(this)
    this.reset = this.reset.bind(this)
    this._populateGrid = this._populateGrid.bind(this)
    this.grid = this._populateGrid();
  }

  _populateGrid(){
    const grid = new Array(this.height)
    for (var i = 0; i < this.height; i++) {
      grid[i] = new Array(this.width)
      for (var j = 0; j < this.width; j++) {
        let cellOffset = this.opts.cellSize + this.opts.wallSize
        let renderPositionX = ((j * cellOffset) + this.opts.mazeOffset[0])
        let renderPositionY = ((i * cellOffset) + this.opts.mazeOffset[1])
        grid[i][j] = new Cell([i,j], renderPositionX, renderPositionY, this.ctx, this);
      }
    }
    return grid
  }

  reset(size){
    this.opts = SIZE_OPTIONS[size]
    this.grid = this._populateGrid();
    this.start = this.getCell([0,0])
    this.end = this.getCell([this.height-1, this.width-1])
  }

  unSolve(){
    this.allCells().forEach( cell => {
      cell.parent = null
      cell.path = false;
      cell.visited = false
      cell.draw();
    })
  }

  getCell(pos){
    let [x, y] = pos
    return this.grid[x][y]
  }

  randomize(opt){
    const allCells = this.allCells();
    if (opt === 'both') {
      this.start = allCells[Math.floor(Math.random() * allCells.length)]
      this.end = allCells[Math.floor(Math.random() * allCells.length)]
    } else {
      this[opt] = allCells[Math.floor(Math.random() * allCells.length)]
    }
    this.draw('solve')
  }

  draw(opt){
    this.allCells().forEach( cell => cell.draw() )
    const cellSize = this.opts.cellSize
    if (opt === 'solve') {
      this.ctx.fillStyle = 'green'
      this.ctx.fillRect(this.start.xPosRender, this.start.yPosRender, cellSize, cellSize);
      this.ctx.fillStyle = 'red'
      this.ctx.fillRect(this.end.xPosRender, this.end.yPosRender, cellSize, cellSize);
    }
  }

  allCells(){
    return [].concat(...this.grid)
  }
}

const SIZE_OPTIONS = {
  'large' : {
    height: 29,
    width: 48,
    cellSize: 13,
    wallSize: 3,
    mazeOffset: [6,8]
  },
  'medium' : {
    height: 19,
    width: 31,
    cellSize: 20,
    wallSize: 5,
    mazeOffset: [5,5]
  },

  'small' : {

  },
}

export default Maze
