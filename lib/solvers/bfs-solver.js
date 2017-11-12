import { enableButtons } from '../binders'
import { colorPath } from '../util'


class BFSSolver {
  constructor(maze){
    this.maze = maze
    this.frontier = [maze.start]
    this.solve = this.solve.bind(this)
  }

  solve(i = 1){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      if (this.frontier.length > 0) {
        let currentCell = this.frontier.shift()
        currentCell.head = true;
        this.maze.draw('solve');
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.frontier = this.frontier.concat(connectedNeighbors)
        }
        currentCell.head = false;
        if (this.maze.end === currentCell) {
          colorPath(this.maze.end)
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
