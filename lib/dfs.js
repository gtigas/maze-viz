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

  solve(){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      this.maze.draw();
      if (this.queue.length > 0) {
        let currentCell = this.queue.shift()
        if (!currentCell.visited) {
          currentCell.visited = true
          this.queue = this.queue.concat(currentCell.unvisitedConnectedCells())
        }
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          this.solved = true
        } else {
          this.solve();
        }
      }
    }, 0)

  }
}

export default Dfs
