import Maze from './maze'
import MazeGenerator from './generator'
import Solver from './solver'

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const maze = new Maze(ctx);
  $('#generate-start').click( ()=>{
    ctx.clearRect(0,0,780,480)
    const generator = new MazeGenerator(maze)
    generator.generate();
  })

  $('#maze-clear').click( ()=>{
    ctx.clearRect(0,0,780,480)
  })

  window.solver = new Solver(maze)
  window.ctx = ctx
});
