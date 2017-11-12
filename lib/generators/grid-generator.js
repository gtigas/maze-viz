import { enableButtons } from '../binders'
import { transpose } from '../util'
import { enableButtons } from '../binders'

class MatrixGenerator {
  constructor(maze) {
    this.maze = maze
  }

  generateFast() {
    this.generate.bind(this)();
  }

  generate() {
    const rows = this.maze.grid
    const cols = transpose(this.maze.grid)
    rows.forEach( row => {
      for (var i = 0; i < row.length - 1; i++) {
        let cell = row[i]
        cell.connectPath(row[i + 1])
        cell.created = true
        cell.draw()
        if (i === row.length - 2) {
          let lastCell = row[i + 1]
          lastCell.created = true
          lastCell.draw()
        }
      }
    })

    cols.forEach( (col, colIdx) => {
      for (var i = 0; i < col.length - 1; i++) {
        if (colIdx % 2 === 0) { continue }
        let cell = col[i]
        cell.connectPath(col[i + 1])
        cell.created = true
        cell.draw()
        if (i === col.length - 2) {
          let lastCell = col[i + 1]
          lastCell.created = true
          lastCell.draw()
        }
      }
    })
    this.maze.draw('solve');
    enableButtons();
  }
}

export default MatrixGenerator;
