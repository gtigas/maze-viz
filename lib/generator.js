import Maze from './maze'

class MazeGenerator {
  constructor(maze){
    this.maze = maze
    this.stack = [maze.getCell([0,0])]
    this.visitedCells = 1
  }


}
