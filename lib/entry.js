import Maze from './maze'
import MazeGenerator from './generator'
import Prims from './prims'
import Solver from './solver'
import Dfs from './dfs'

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const maze = new Maze(ctx);
  $('#generate-prims').click( ()=>{
    ctx.clearRect(0,0,780,480)
    const generator = new Prims(maze)
    generator.generate();
  })
  $('#generate-start').click( ()=>{
    ctx.clearRect(0,0,780,480)
    const generator = new MazeGenerator(maze)
    generator.generate();
  })

  $('#maze-clear').click( ()=>{
    maze.reset();
    ctx.clearRect(0,0,780,480)
  })

  $('#maze-solve').click( ()=>{
    const solver = new Solver(maze)
    solver.solve();
  })

  $('#maze-dfs').click( ()=>{
    const solver = new Dfs(maze)
    solver.solve();
  })


});
