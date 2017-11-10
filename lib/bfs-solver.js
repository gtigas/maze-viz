import { enableButtons } from './binders'

class BFSSolver {
  constructor(maze){
    this.maze = maze
    this.queue = [maze.start]
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
    }, 2)
  }

  solve(i = 1){
    if (this.solved) {
      enableButtons();
      return
    }
    setTimeout( () => {
      if (this.queue.length > 0) {
        let currentCell = this.queue.shift()
        currentCell.head = true;
        this.maze.draw('solve');
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.queue = this.queue.concat(connectedNeighbors)
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

export default BFSSolver
