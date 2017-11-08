import Cell from './cell'

class Maze {
  constructor(ctx){
    this.grid = this._populateGrid(ctx);
    this.ctx = ctx
    this.getCell = this.getCell.bind(this)
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

  getCell(pos){
    let [x, y] = pos
    return this.grid[x][y]
  }

  draw(){
    const allCells = [].concat(...this.grid)
    allCells.forEach( cell => cell.draw() )
  }
}

export default Maze
