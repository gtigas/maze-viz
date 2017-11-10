/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binders__ = __webpack_require__(7);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  Object(__WEBPACK_IMPORTED_MODULE_0__binders__["a" /* default */])(ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell__ = __webpack_require__(2);


class Maze {
  constructor(ctx){
    this.grid = this._populateGrid(ctx);
    this.ctx = ctx
    this.getCell = this.getCell.bind(this)
    this.start = this.getCell([0,0])
    this.end = this.getCell([18,30])
    this.reset = this.reset.bind(this)
  }

  _populateGrid(ctx){
    const grid = new Array(19)
    for (var i = 0; i < 19; i++) {
      grid[i] = new Array(31)
      for (var j = 0; j < 31; j++) {
        let renderPositionX = ((j * 25) + 5)
        let renderPositionY = ((i * 25) + 5)
        grid[i][j] = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */]([i,j], renderPositionX, renderPositionY, ctx, this);
      }
    }
    return grid
  }

  reset(){
    this.grid = this._populateGrid(this.ctx);
    this.start = this.getCell([0,0])
    this.end = this.getCell([18,30])
  }

  unSolve(){
    this.allCells().forEach( cell => {
      cell.parent = null
      cell.path = false;
      cell.visited = false
      cell.draw();
    })
  }

  getCell(pos){
    let [x, y] = pos
    return this.grid[x][y]
  }

  randomize(opt){
    const allCells = this.allCells();
    if (opt === 'both') {
      this.start = allCells[Math.floor(Math.random() * allCells.length)]
      this.end = allCells[Math.floor(Math.random() * allCells.length)]
    } else {
      this[opt] = allCells[Math.floor(Math.random() * allCells.length)]
    }
    this.draw('solve')
  }

  draw(opt){
    this.allCells().forEach( cell => cell.draw() )
    if (opt === 'solve') {
      this.ctx.fillStyle = 'green'
      this.ctx.fillRect(this.start.xPosRender, this.start.yPosRender, 20, 20);
      this.ctx.fillStyle = 'red'
      this.ctx.fillRect(this.end.xPosRender, this.end.yPosRender, 20, 20);
    }
  }

  allCells(){
    return [].concat(...this.grid)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Maze);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cell {
  constructor(pos, x, y, ctx, maze){
    this.created = false;
    this.visited = false;
    this.path = false;
    this.start = false;
    this.end = false;
    this.pos = pos;
    this.parent = null;
    this.xPosRender = x;
    this.yPosRender = y;
    this.i = 1;
    this.connectedCells = [];
    this.ctx = ctx;
    this.maze = maze;
    this.neighbors = this.neighbors.bind(this)
    this._checkNeighborPath = this._checkNeighborPath.bind(this)
    this._breakDownWalls = this._breakDownWalls.bind(this)
  }

  neighbors(){
    const neighbors = [];
    Object.keys(DIRS).forEach( dir =>{
      let neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
      if (this._isInvalidPosition(neighborPos)) return;

      let neighbor = this.maze.getCell(neighborPos);
      neighbors.push(neighbor)
    });

    return neighbors
  }

  unvisitedNeighbors(type){
    return this.neighbors().filter( neighbor => {
      return neighbor[type] === false
    });
  }
  mazeNeighbors(){
    return this.neighbors().filter( neighbor => {
      return neighbor.created === true
    });
  }

  unvisitedConnectedCells(){
    return this.connectedCells.filter( neighbor => {
      return neighbor.visited === false
    });
  }

  connectPath(otherCell){
    this.connectedCells.push(otherCell)
    otherCell.connectedCells.push(this)
  }

  draw(){
    if (this.created) {
      this.ctx.fillStyle = 'white'
    } else {
      this.ctx.fillStyle = "rgba(0, 0, 200, 0)"
    }
    if (this.visited) {
      const g = 240 - Math.floor(this.i * 0.439)
      const b =  Math.floor(this.i * 0.439)
      const r = Math.floor(this.i * 0.14)
      this.ctx.fillStyle = `rgba(${r},${g},${b},1)`
    }
    if (this.path) {
      this.ctx.fillStyle = 'yellow'
    }
    if (this.head) {
      this.ctx.fillStyle = 'red'
    }
    this._breakDownWalls();
    this.ctx.fillRect(this.xPosRender, this.yPosRender, 20, 20);
  }

  _breakDownWalls(){
    if (this._checkNeighborPath('S')) {
      this.ctx.fillRect(this.xPosRender, (this.yPosRender + 20), 20, 5);
    }
    if (this._checkNeighborPath('E')) {
      this.ctx.fillRect(this.xPosRender + 20, this.yPosRender, 5, 20);
    }
  }

  _checkNeighborPath(dir){
    const neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
    return this.connectedCells.some( cell => {
      return cell.pos.toString() === neighborPos.toString()
    })
  }

  _isInvalidPosition(pos){
    return ((pos[0] < 0 || pos[0] > 18) || (pos[1] < 0 || pos[1] > 30))
  }
}

const DIRS = {
  'N': [-1,0],
  'E': [0,1],
  'S': [1,0],
  'W': [0,-1],
}

/* harmony default export */ __webpack_exports__["a"] = (Cell);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MazeGenerator {
  constructor(maze){
    this.maze = maze
    this.stack = []
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
  }

  generate(){
    $('#generate-start').prop('disabled', true)
    this.stack.unshift(this.maze.getCell([0,0]))
    this.stack[0].created = true
    this.visitedCells++
    const renderMaze = setInterval( () => {
      this.maze.draw()
      if (this.visitedCells < 590) {
        let currentCell = this.stack[0]
        currentCell.head = true
        let unvisitedNeighbors = currentCell.unvisitedNeighbors('created')
        if (unvisitedNeighbors.length > 0) {
          let randomCell = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
          this.stack.unshift(randomCell)
          currentCell.connectPath(randomCell)
          currentCell.head = false
          currentCell = randomCell
          currentCell.created = true
          this.visitedCells++
        } else {
          this.stack.shift().head = false;
          this.stack[0].head = true;
        }
      } else {
        clearInterval(renderMaze)
        this.maze.draw('solve');
        $('#generate-start').prop('disabled', false)
      }
    }, 0)

  }



}

/* harmony default export */ __webpack_exports__["a"] = (MazeGenerator);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Solver {
  constructor(maze){
    this.maze = maze
    this.stack = [maze.start]
    this.solve = this.solve.bind(this)
    this.colorPath = this.colorPath.bind(this)
  }

  colorPath(cell) {
    if (!cell) {
      return
    }
    setTimeout( () => {
      cell.path = true;
      cell.draw()
      this.colorPath(cell.parent)
    }, 2)
  }

  solve(i = 1){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      this.maze.draw('solve');
      if (this.stack.length > 0) {
        let currentCell = this.stack.shift()
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.stack = connectedNeighbors.concat(this.stack)
        }
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          this.solved = true
        } else {
          i++
          this.solve(i);
        }
      }
    }, 0)

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Solver);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PrimsGenerator {
  constructor(maze){
    this.maze = maze
    this.frontier = maze.start.unvisitedNeighbors('created')
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
    maze.start.created = true
  }

  generate(){
    $('#generate-prims').prop('disabled', true)
    if (this.frontier.length === 0) {
      this.maze.draw('solve')
      $('#generate-prims').prop('disabled', false)
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
    }, 5)
  }


}

/* harmony default export */ __webpack_exports__["a"] = (PrimsGenerator);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Dfs {
  constructor(maze){
    this.maze = maze
    this.queue = [maze.start]
    this.solve = this.solve.bind(this)
    this.colorPath = this.colorPath.bind(this)
  }

  colorPath(cell) {
    if (!cell) {
      return
    }
    setTimeout( () => {
      cell.path = true;
      cell.draw()
      this.colorPath(cell.parent)
    }, 2)
  }

  solve(i = 1){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      this.maze.draw('solve');
      if (this.queue.length > 0) {
        let currentCell = this.queue.shift()
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.queue = this.queue.concat(connectedNeighbors)
        }
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          this.solved = true
        } else {
          i++
          this.solve(i);
        }
      }
    }, 0)

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dfs);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maze__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prims__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__solver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dfs__ = __webpack_require__(6);






const bindAll = ctx => {
  const maze = new __WEBPACK_IMPORTED_MODULE_0__maze__["a" /* default */](ctx);
  $('#generate-prims').click( ()=>{
    maze.reset()
    ctx.clearRect(0,0,780,480)
    const generator = new __WEBPACK_IMPORTED_MODULE_2__prims__["a" /* default */](maze)
    generator.generate();
  })
  $('#generate-start').click( ()=>{
    maze.reset()
    ctx.clearRect(0,0,780,480)
    const generator = new __WEBPACK_IMPORTED_MODULE_1__generator__["a" /* default */](maze)
    generator.generate();
  })

  $('#reset-button').click( ()=>{
    maze.unSolve();
  })

  $('#maze-solve').click( ()=>{
    maze.unSolve();
    const solver = new __WEBPACK_IMPORTED_MODULE_3__solver__["a" /* default */](maze)
    solver.solve();
  })

  $('#maze-dfs').click( ()=>{
    maze.unSolve();
    const solver = new __WEBPACK_IMPORTED_MODULE_4__dfs__["a" /* default */](maze)
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

/* harmony default export */ __webpack_exports__["a"] = (bindAll);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map