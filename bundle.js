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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maze__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = 'black'
  const asdf = new __WEBPACK_IMPORTED_MODULE_0__maze__["a" /* default */](ctx);
  window.asdf = asdf
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

  getCell(pos){
    let [x, y] = pos
    return this.grid[x][y]
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Maze);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cell {
  constructor(pos, x, y, ctx, maze){
    this.visited = false;
    this.pos = pos;
    this.xPosRender = x;
    this.yPosRender = y;
    this.ctx = ctx;
    this.maze = maze;
    this.ctx.fillRect(x, y, 20, 20);
  }

  neighbors(){
    const DIRS = {
      'N': [1,0],
      'E': [0,1],
      'S': [-1,0],
      'W': [0,-1],
    }
    const neighbors = [];
    Object.keys(DIRS).forEach( dir =>{
      let neighborPos = [this.pos[0] +  DIRS[dir][0], this.pos[1] + DIRS[dir][1]]
      if ((neighborPos[0] < 0 || neighborPos[0] > 18) ||
          (neighborPos[1] < 0 || neighborPos[1] > 30)  ) {
        return
      }
      let neighbor = this.maze.getCell(neighborPos);
      neighbors.push(neighbor)
    });

    return neighbors
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Cell);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map