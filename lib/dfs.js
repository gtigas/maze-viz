class Dfs {
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
      return
    }
    setTimeout( () => {
      this.maze.draw('solve');
      if (this.queue.length > 0) {
        let currentCell = this.queue.shift()
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.queue = this.queue.concat(connectedNeighbors)
        }
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          this.solved = true
        } else {
          i++
          this.solve(i);
        }
      }
    }, 0)

  }
}

export default Dfs
