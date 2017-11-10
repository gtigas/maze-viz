import { enableButtons } from './binders'


class PrimsGenerator {
  constructor(maze){
    this.maze = maze
    this.frontier = maze.start.unvisitedNeighbors('created')
    this.generate = this.generate.bind(this)
    maze.start.created = true
  }

  generate(){
    if (this.frontier.length === 0) {
      this.maze.draw('solve')
      enableButtons();
      return
    }
    setTimeout( () => {
      if (this.frontier.length > 0) {
        let randomCell = this.frontier.splice([Math.floor(Math.random() * this.frontier.length)], 1)[0]
        randomCell.head = true
        this.maze.draw(); 
        let mazeNeighbors = randomCell.mazeNeighbors();
        let randomMazeNeighbor = mazeNeighbors[Math.floor(Math.random() * mazeNeighbors.length)]
        randomCell.connectPath(randomMazeNeighbor)
        randomCell.parent = randomMazeNeighbor
        randomCell.created = true
        const unvisitedNeighbors = randomCell.unvisitedNeighbors('created')
        unvisitedNeighbors.forEach( cell => {
          this.frontier = this.frontier.filter( frontier => {
            return frontier.pos.toString() !== cell.pos.toString()
          })
        })
        this.frontier = this.frontier.concat(unvisitedNeighbors)
        randomCell.head = false
        this.generate()
      }
    }, 0)
  }


}

export default PrimsGenerator;
