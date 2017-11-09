class MazeGenerator {
  constructor(maze){
    this.maze = maze
    this.stack = []
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
    this.animate = this.animate.bind(this)
  }

  generate(){
    $('#generate-start').prop('disabled', true)
    requestAnimationFrame(this.animate)
    this.stack.unshift(this.maze.getCell([0,0]))
    this.stack[0].created = true
    this.visitedCells++
    const renderMaze = setInterval( () => {
      if (this.visitedCells < 590) {
        let currentCell = this.stack[0]
        let unvisitedNeighbors = currentCell.unvisitedNeighbors('created')
        if (unvisitedNeighbors.length > 0) {
          unvisitedNeighbors.forEach( cell => {
            cell.parent = currentCell
          })
          let randomCell = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
          this.stack.unshift(randomCell)
          currentCell.connectPath(randomCell)
          currentCell.head = false
          currentCell = randomCell
          currentCell.created = true
          currentCell.head = true
          this.visitedCells++
        } else {
          this.stack.shift().head = false;
          this.stack[0].head = true;
        }
      } else {
        clearInterval(renderMaze)
        $('#generate-start').prop('disabled', false)
      }
    }, 0)

  }

  animate(){
    this.maze.draw();
    if (this.visitedCells === 590) {
      return
    }
    requestAnimationFrame(this.animate)
  }


}

export default MazeGenerator
