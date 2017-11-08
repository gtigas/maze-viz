import Cell from './cell'

class Maze {
  constructor(ctx){
    this.grid = this._populateGrid(ctx);
    this.ctx = ctx
  }

  _populateGrid(ctx){
    const grid = new Array(19)
    for (var i = 0; i < 19; i++) {
      grid[i] = new Array(31)
      for (var j = 0; j < 31; j++) {
        let renderPositionX = ((j * 25) + 5)
        let renderPositionY = ((i * 25) + 5)
        grid[i][j] = new Cell(renderPositionX, renderPositionY, ctx);
      }
    }
    return grid
  }
}

export default Maze
