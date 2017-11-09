import Maze from './maze'
import MazeGenerator from './generator'
import $ from 'jquery'

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  $('#generate-start').click( ()=>{
    const maze = new Maze(ctx);
    const generator = new MazeGenerator(maze)
    generator.generate();
  })
});
