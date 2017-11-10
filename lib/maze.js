import Cell from './cell'

class Maze {
  constructor(ctx){
    this.grid = this._populateGrid(ctx);
    this.ctx = ctx
    this.getCell = this.getCell.bind(this)
    this.start = this.getCell([0,0])
    this.end = this.getCell([18,30])
    this.reset = this.reset.bind(this)
  }

  _populateGrid(ctx){
    const grid = new Array(19)
    for (var i = 0; i < 19; i++) {
      grid[i] = new Array(31)
      for (var j = 0; j < 31; j++) {
        let renderPositionX = ((j * 25) + 5)
        let renderPositionY = ((i * 25) + 5)
        grid[i][j] = new Cell([i,j], renderPositionX, renderPositionY, ctx, this);
      }
    }
    return grid
  }

  reset(){
    this.grid = this._populateGrid(this.ctx);
    this.start = this.getCell([0,0])
    this.end = this.getCell([18,30])
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
    if (opt === 'solve') {
      this.ctx.fillStyle = 'green'
      this.ctx.fillRect(this.start.xPosRender, this.start.yPosRender, 20, 20);
      this.ctx.fillStyle = 'red'
      this.ctx.fillRect(this.end.xPosRender, this.end.yPosRender, 20, 20);
    }
  }

  allCells(){
    return [].concat(...this.grid)
  }
}

export default Maze
