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
  Object(__WEBPACK_IMPORTED_MODULE_0__binders__["a" /* bindAll */])(ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell__ = __webpack_require__(2);


class Maze {
  constructor(ctx, size){
    this.opts = SIZE_OPTIONS[size]
    this.ctx = ctx
    this.width = this.opts.width
    this.height = this.opts.height
    this.getCell = this.getCell.bind(this)
    this.reset = this.reset.bind(this)
    this._populateGrid = this._populateGrid.bind(this)
    this.grid = this._populateGrid();
    this.start = this.getCell([0,0])
  }

  _populateGrid(){
    const grid = new Array(this.height)
    for (var i = 0; i < this.height; i++) {
      grid[i] = new Array(this.width)
      for (var j = 0; j < this.width; j++) {
        let cellOffset = this.opts.cellSize + this.opts.wallSize
        let renderPositionX = ((j * cellOffset) + this.opts.mazeOffset[0])
        let renderPositionY = ((i * cellOffset) + this.opts.mazeOffset[1])
        grid[i][j] = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */]([i,j], renderPositionX, renderPositionY, this.ctx, this);
      }
    }
    return grid
  }

  reset(size){
    this.opts = SIZE_OPTIONS[size]
    this.width = this.opts.width
    this.height = this.opts.height
    this.grid = this._populateGrid();
    this.start = this.getCell([0,0])
    this.end = this.getCell([this.height-1, this.width-1])
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
    const cellSize = this.opts.cellSize
    if (opt === 'solve') {
      this.ctx.fillStyle = 'green'
      this.ctx.fillRect(this.start.xPosRender, this.start.yPosRender, cellSize, cellSize);
      this.ctx.fillStyle = 'red'
      this.ctx.fillRect(this.end.xPosRender, this.end.yPosRender, cellSize, cellSize);
    }
  }

  allCells(){
    return [].concat(...this.grid)
  }
}

const SIZE_OPTIONS = {
  'large' : {
    height: 29,
    width: 48,
    cellSize: 13,
    wallSize: 3,
    mazeOffset: [6,8]
  },
  'medium' : {
    height: 19,
    width: 31,
    cellSize: 20,
    wallSize: 5,
    mazeOffset: [5,5]
  },

  'small' : {
    height: 13,
    width: 21,
    cellSize: 30,
    wallSize: 7,
    mazeOffset: [5,3]
  },
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
    const cellSize = this.maze.opts.cellSize
    this.ctx.fillRect(this.xPosRender, this.yPosRender, cellSize, cellSize);
  }

  _breakDownWalls(){
    const { cellSize, wallSize } = this.maze.opts
    if (this._checkNeighborPath('S')) {
      this.ctx.fillRect(this.xPosRender, (this.yPosRender + cellSize), cellSize, wallSize);
    }
    if (this._checkNeighborPath('E')) {
      this.ctx.fillRect(this.xPosRender + cellSize, this.yPosRender, wallSize, cellSize);
    }
  }

  _checkNeighborPath(dir){
    const neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
    return this.connectedCells.some( cell => {
      return cell.pos.toString() === neighborPos.toString()
    })
  }

  _isInvalidPosition(pos){
    return ((pos[0] < 0 || pos[0] > (this.maze.height - 1)) || (pos[1] < 0 || pos[1] > (this.maze.width - 1)))
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maze__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dfs_generator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prims_generator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__grid_generator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bfs_solver__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dfs_solver__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__(12);








const bindAll = ctx => {
  const maze = new __WEBPACK_IMPORTED_MODULE_0__maze__["a" /* default */](ctx, 'medium');
  $('#generate').click( ()=>{
    disableButtons();
    const mazeSize = rangeText[$("#maze-size").val()].toLowerCase();
    maze.reset(mazeSize)
    const generatorType = $("input[name='generator']:checked").val();
    let generator;
    switch (generatorType) {
      case 'prims':
        generator = new __WEBPACK_IMPORTED_MODULE_2__prims_generator__["a" /* default */](maze)
        break;
      case 'dfs':
        generator = new __WEBPACK_IMPORTED_MODULE_1__dfs_generator__["a" /* default */](maze)
        break;
      case 'matrix':
        generator = new __WEBPACK_IMPORTED_MODULE_3__grid_generator__["a" /* default */](maze)
        break;
    }
    ctx.clearRect(0,0,780,480)
    generator.generate();
  })

  $('#reset-button').click( ()=>{
    maze.unSolve();
  })

  $('#solve').click( ()=>{
    Object(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* resetPathDistance */])();
    disableButtons();
    maze.unSolve();
    const solverType = $("input[name='solver']:checked").val();
    let solver;
    switch (solverType) {
      case 'bfs':
        solver = new __WEBPACK_IMPORTED_MODULE_4__bfs_solver__["a" /* default */](maze)
        break;
      case 'dfs':
        solver = new __WEBPACK_IMPORTED_MODULE_5__dfs_solver__["a" /* default */](maze)
        break;
    }
    solver.solve();
  })

  $('#random-both').click( ()=>{
    Object(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* resetPathDistance */])();
    maze.unSolve();
    maze.randomize('both')
  })

  $('#range-text').text(rangeText[$("#maze-size").val()])
  $('#maze-size').on('input change', () => {
    $('#range-text').text(rangeText[$("#maze-size").val()])
  })
}
/* harmony export (immutable) */ __webpack_exports__["a"] = bindAll;


const rangeText = {
  '1' : 'Small',
  '2' : 'Medium',
  '3' : 'Large'
}

const disableButtons = () => {
  $("button").prop('disabled', true)
}

const enableButtons = () => {
  $("button").prop('disabled', false)
}
/* harmony export (immutable) */ __webpack_exports__["b"] = enableButtons;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binders__ = __webpack_require__(7);



class DFSGenerator {
  constructor(maze){
    this.maze = maze
    this.stack = [this.maze.getCell([0,0])]
    this.visitedCells = 1
    this.generate = this.generate.bind(this)
    this.stack[0].created = true
  }

  generate(){
    if (this.visitedCells === ((this.maze.width) * (this.maze.height))) {
      this.maze.draw('solve');
      Object(__WEBPACK_IMPORTED_MODULE_0__binders__["b" /* enableButtons */])();
      return
    }
    setTimeout( () => {
      this.maze.draw()
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
      this.generate();
    }, 0)
  }



}

/* harmony default export */ __webpack_exports__["a"] = (DFSGenerator);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binders__ = __webpack_require__(7);



class PrimsGenerator {
  constructor(maze){
    this.maze = maze
    this.frontier = maze.start.unvisitedNeighbors('created')
    this.generate = this.generate.bind(this)
    this.maze.start.created = true
  }

  generate(){
    if (this.frontier.length === 0) {
      this.maze.draw('solve')
      Object(__WEBPACK_IMPORTED_MODULE_0__binders__["b" /* enableButtons */])();
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
    }, 0)
  }


}

/* harmony default export */ __webpack_exports__["a"] = (PrimsGenerator);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binders__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(12);



class DFSSolver {
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
      Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* incrementPathDistance */])();
    }, 2)
  }

  solve(i = 1){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      if (this.stack.length > 0) {
        let currentCell = this.stack.shift()
        currentCell.head = true;
        this.maze.draw('solve');
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.stack = connectedNeighbors.concat(this.stack)
        }
        currentCell.head = false;
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          Object(__WEBPACK_IMPORTED_MODULE_0__binders__["b" /* enableButtons */])();
          this.solved = true
        } else {
          i++
          this.solve(i);
        }
      }
    }, 0)

  }
}

/* harmony default export */ __webpack_exports__["a"] = (DFSSolver);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binders__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(12);




class BFSSolver {
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
      Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* incrementPathDistance */])();
    }, 2)
  }

  solve(i = 1){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      if (this.queue.length > 0) {
        let currentCell = this.queue.shift()
        currentCell.head = true;
        this.maze.draw('solve');
        if (!currentCell.visited) {
          currentCell.visited = true
          currentCell.i = i
          let connectedNeighbors = currentCell.unvisitedConnectedCells()
          connectedNeighbors.forEach( cell => cell.parent = currentCell)
          this.queue = this.queue.concat(connectedNeighbors)
        }
        currentCell.head = false;
        if (this.maze.end === currentCell) {
          this.colorPath(this.maze.end)
          Object(__WEBPACK_IMPORTED_MODULE_0__binders__["b" /* enableButtons */])();
          this.solved = true
        } else {
          i++
          this.solve(i);
        }
      }
    }, 0)

  }
}

/* harmony default export */ __webpack_exports__["a"] = (BFSSolver);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const resetPathDistance  = () => {
  $("#path").text("0")
}
/* harmony export (immutable) */ __webpack_exports__["b"] = resetPathDistance;


const incrementPathDistance = () => {
  let currentDistance = parseInt($("#path").text())
  currentDistance++
  $("#path").text(currentDistance)
}
/* harmony export (immutable) */ __webpack_exports__["a"] = incrementPathDistance;


// Source: femto113 via github
// https://gist.github.com/femto113/1784503
const transpose = (a) => a[0].map((_, c) => a.map(r => r[c]));
/* harmony export (immutable) */ __webpack_exports__["c"] = transpose;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binders__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(12);




class MatrixGenerator {
  constructor(maze) {
    this.maze = maze
  }

  generate() {
    const rows = this.maze.grid
    const cols = Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* transpose */])(this.maze.grid)
    console.log(rows);
    console.log(cols);
    rows.forEach( row => {
      for (var i = 0; i < row.length - 1; i++) {
        let cell = row[i]
        cell.connectPath(row[i + 1])
        cell.created = true
        cell.draw()
        if (i === row.length - 2) {
          let lastCell = row[i + 1]
          lastCell.created = true
          lastCell.draw()
        }
      }
    })

    cols.forEach( (col, colIdx) => {
      for (var i = 0; i < col.length - 1; i++) {
        if (colIdx % 2 === 0) { continue }
        let cell = col[i]
        cell.connectPath(col[i + 1])
        cell.created = true
        cell.draw()
        if (i === col.length - 2) {
          let lastCell = col[i + 1]
          lastCell.created = true
          lastCell.draw()
        }
      }
    })
    this.maze.draw('solve');
    Object(__WEBPACK_IMPORTED_MODULE_0__binders__["b" /* enableButtons */])();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MatrixGenerator);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map