class Solver {
  constructor(maze){
    this.maze = maze
    this.stack = [maze.start]
    this.visitedCells = 1
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
    }, 10)
  }

  solve(){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      this.maze.draw();
      if (this.stack.length > 0) {
        let currentCell = this.stack.shift()
        if (!currentCell.visited) {
          currentCell.visited = true
          this.visitedCells++
          this.stack = currentCell.unvisitedConnectedCells().concat(this.stack)
        }
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          this.solved = true
        } else {
          this.solve();
        }
      }
    }, 10)

  }
}

export default Solver
