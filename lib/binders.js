import Maze from './maze'
import MazeGenerator from './generator'
import Prims from './prims'
import Solver from './solver'
import Dfs from './dfs'

const bindAll = ctx => {
  const maze = new Maze(ctx);
  $('#generate-prims').click( ()=>{
    maze.reset()
    ctx.clearRect(0,0,780,480)
    const generator = new Prims(maze)
    generator.generate();
  })
  $('#generate-start').click( ()=>{
    maze.reset()
    ctx.clearRect(0,0,780,480)
    const generator = new MazeGenerator(maze)
    generator.generate();
  })

  $('#reset-button').click( ()=>{
    maze.unSolve();
  })

  $('#maze-solve').click( ()=>{
    maze.unSolve();
    const solver = new Solver(maze)
    solver.solve();
  })

  $('#maze-dfs').click( ()=>{
    maze.unSolve();
    const solver = new Dfs(maze)
    solver.solve();
  })
  $('#random-start').click( ()=>{
    maze.randomize('start')
  })
  $('#random-end').click( ()=>{
    maze.randomize('end')
  })
  $('#random-both').click( ()=>{
    maze.randomize('both')
  })
}

export default bindAll
