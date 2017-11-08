import Maze from './maze'

class MazeGenerator {
  constructor(maze){
    this.maze = maze
    this.stack = []
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
    this.animate = this.animate.bind(this)
  }

  generate(){
    requestAnimationFrame(this.animate)
    this.stack.unshift(this.maze.getCell([0,0]))
    this.stack[0].visited = true
    this.visitedCells++
    const renderMaze = setInterval( () => {
      if (this.visitedCells < 590) {
        let currentCell = this.stack[0]
        let unvisitedNeighbors = currentCell.unvisitedNeighbors()
        if (unvisitedNeighbors.length > 0) {
          let randomCell = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
          this.stack.unshift(randomCell)
          currentCell.connectPath(randomCell)
          currentCell = randomCell
          currentCell.visited = true
          this.visitedCells++
        } else {
          this.stack.shift();
        }
        console.log(this.visitedCells)
      } else {
        clearInterval(renderMaze)
      }
    }, 10)

  }

  animate(){
    this.maze.draw();
    requestAnimationFrame(this.animate)
  }


}

export default MazeGenerator
