import { enableButtons } from './binders'


class DFSGenerator {
  constructor(maze){
    this.maze = maze
    this.stack = [this.maze.getCell([0,0])]
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
    this.stack[0].created = true
  }

  generate(){
    if (this.visitedCells === ((this.maze.width) * (this.maze.height))) {
      this.maze.draw('solve');
      enableButtons();
      return
    }
    setTimeout( () => {
      this.maze.draw()
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
      this.generate();
    }, 0)
  }



}

export default DFSGenerator
