import Maze from './maze'

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = 'white'
  const asdf = new Maze(ctx);
  console.log(asdf)
});
