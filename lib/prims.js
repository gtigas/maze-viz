class PrimsGenerator {
  constructor(maze){
    this.maze = maze
    this.frontier = maze.start.unvisitedNeighbors('created')
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
    maze.start.created = true
  }

  generate(){
    if (this.frontier.length === 0) {
      this.maze.draw()
      return
    }
    setTimeout( () => {
      this.maze.draw(); 
      if (this.frontier.length > 0) {
        let randomCell = this.frontier.splice([Math.floor(Math.random() * this.frontier.length)], 1)[0]
        let mazeNeighbors = randomCell.mazeNeighbors();
        let randomMazeNeighbor = mazeNeighbors[Math.floor(Math.random() * mazeNeighbors.length)]
        randomCell.connectPath(randomMazeNeighbor)
        randomCell.created = true
        const unvisitedNeighbors = randomCell.unvisitedNeighbors('created')
        unvisitedNeighbors.forEach( cell => {
          this.frontier = this.frontier.filter( frontier => {
            return frontier.pos.toString() !== cell.pos.toString()
          })
        })
        this.frontier = this.frontier.concat(unvisitedNeighbors)
        this.generate()
      }
    }, 0)
  }


}

export default PrimsGenerator;
