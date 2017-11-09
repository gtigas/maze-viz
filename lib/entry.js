import Maze from './maze'
import MazeGenerator from './generator'

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  $('#generate-start').click( ()=>{
    ctx.clearRect(0,0,780,480)
    const maze = new Maze(ctx);
    const generator = new MazeGenerator(maze)
    generator.generate();
  })

  $('#maze-clear').click( ()=>{
    ctx.clearRect(0,0,780,480)
  })
});
