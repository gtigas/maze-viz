import Maze from './maze'
import DFSGenerator from './dfs-generator'
import PrimsGenerator from './prims-generator'
import BFSSolver from './bfs-solver'
import DFSSolver from './dfs-solver'

export const bindAll = ctx => {
  const maze = new Maze(ctx, 'large');
  $('#generate-prims').click( ()=>{
    disableButtons();
    maze.reset('large')
    ctx.clearRect(0,0,780,480)
    const generator = new PrimsGenerator(maze)
    generator.generate();
  })
  $('#generate-start').click( ()=>{
    disableButtons();
    maze.reset('large')
    ctx.clearRect(0,0,780,480)
    const generator = new DFSGenerator(maze)
    generator.generate();
  })

  $('#reset-button').click( ()=>{
    maze.unSolve();
  })

  $('#maze-solve').click( ()=>{
    maze.unSolve();
    const solver = new BFSSolver(maze)
    solver.solve();
  })

  $('#maze-dfs').click( ()=>{
    maze.unSolve();
    const solver = new DFSSolver(maze)
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

const disableButtons = () => {
  $("button").prop('disabled', true)
}

export const enableButtons = () => {
  $("button").prop('disabled', false)
}
