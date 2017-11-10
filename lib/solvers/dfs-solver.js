import { enableButtons } from '../binders'
import { incrementPathDistance } from '../util'

class DFSSolver {
  constructor(maze){
    this.maze = maze
    this.stack = [maze.start]
    this.solve = this.solve.bind(this)
    this.colorPath = this.colorPath.bind(this)
  }

  colorPath(cell) {
    if (!cell) {
      return
    }
    setTimeout( () => {
      cell.path = true;
      cell.draw()
      this.colorPath(cell.parent)
      incrementPathDistance();
    }, 2)
  }

  solve(i = 1){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      if (this.stack.length > 0) {
        let currentCell = this.stack.shift()
        currentCell.head = true;
        this.maze.draw('solve');
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.stack = connectedNeighbors.concat(this.stack)
        }
        currentCell.head = false;
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          enableButtons();
          this.solved = true
        } else {
          i++
          this.solve(i);
        }
      }
    }, 0)

  }
}

export default DFSSolver
