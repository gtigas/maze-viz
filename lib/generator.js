import { enableButtons } from './binders'


class MazeGenerator {
  constructor(maze){
    this.maze = maze
    this.stack = []
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
  }

  generate(){
    this.stack.unshift(this.maze.getCell([0,0]))
    this.stack[0].created = true
    this.visitedCells++
    const renderMaze = setInterval( () => {
      this.maze.draw()
      if (this.visitedCells < 590) {
        let currentCell = this.stack[0]
        currentCell.head = true
        let unvisitedNeighbors = currentCell.unvisitedNeighbors('created')
        if (unvisitedNeighbors.length > 0) {
          let randomCell = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
          this.stack.unshift(randomCell)
          currentCell.connectPath(randomCell)
          currentCell.head = false
          currentCell = randomCell
          currentCell.created = true
          this.visitedCells++
        } else {
          this.stack.shift().head = false;
          this.stack[0].head = true;
        }
      } else {
        clearInterval(renderMaze)
        this.maze.draw('solve');
        enableButtons();
      }
    }, 0)

  }



}

export default MazeGenerator
