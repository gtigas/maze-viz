import Maze from './maze'
import MazeGenerator from './generator'

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = 'black'
  const maze = new Maze(ctx);
  const generator = new MazeGenerator(maze)
  window.generator = generator
});
