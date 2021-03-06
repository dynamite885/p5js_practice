/* eslint-disable no-undef, no-unused-vars */
const cellSize = 30;
const color = {
  white: [255, 255, 255],
  cyan: [0, 255, 255],
  yellow: [255, 255, 0],
  mazenta: [255, 0, 255],
  orange: [255, 127, 0],
  blue: [0, 0, 255],
  green: [0, 255, 0],
  red: [255, 0, 0],
  gray: [100, 100, 100],
  black: [0, 0, 0]
};
const mino = {
  I: [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1]
  ],
  O: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ],
  T: [
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 1]
  ],
  L: [
    [0, 1],
    [1, 1],
    [2, 0],
    [2, 1]
  ],
  J: [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1]
  ],
  S: [
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 0]
  ],
  Z: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1]
  ]
}; // 미노 기본 데이터 IOTLJSZ순
const rotationMatrix = [
  [
    [1, 0],
    [0, 1]
  ],
  [
    [0, -1],
    [1, 0]
  ],
  [
    [-1, 0],
    [0, -1]
  ],
  [
    [0, 1],
    [-1, 0]
  ]
]; // 0도, 90도, 180도, 270도 회전시 행렬곱에 사용되는 회전행렬 데이터
const SRS = [
  [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ]
  ],
  [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ]
  ],
  [
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 0],
      [2, 0]
    ],
    [
      [-1, 0],
      [0, 0],
      [0, 0],
      [0, -1],
      [0, 2]
    ],
    [
      [-1, -1],
      [1, -1],
      [-2, -1],
      [1, 0],
      [-2, 0]
    ],
    [
      [0, -1],
      [0, -1],
      [0, -1],
      [0, 1],
      [0, -2]
    ]
  ]
]; // Super Rotation System 데이터
class Block {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }
  draw() {
    push();
    stroke(color.black);
    fill(Object.values(color)[this.c]);
    strokeWeight(1);
    rect(
      this.x * cellSize - 5 * cellSize,
      this.y * cellSize - cellSize * 19.5 - windowHeight / 2,
      cellSize,
      cellSize
    );
    pop();
  }
}
class Mino {
  constructor(x, y, shape, rot = 0) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.rot = rot;
  }
  getBlocks() {
    let r = rotationMatrix[this.rot];
    let s = Object.values(mino)[this.shape].map((m) => {
      let x = m[0] * r[0][0] + m[1] * r[0][1];
      let y = m[0] * r[1][0] + m[1] * r[1][1];
      return [
        x - Math.min(...r[0]) * 2 + this.x,
        y - Math.min(...r[1]) * 2 + this.y
      ];
    });
    return s;
  } //회전한 만큼 변한 모습을 절대좌표로 반환
  setSRS(n, r) {
    r = (this.rot - r + 4) % 4;
    let s = Math.max(...Object.values(mino)[this.shape][3]) - 1;
    let toX = SRS[s][r][n][0] - SRS[s][this.rot][n][0];
    let toY = SRS[s][r][n][1] - SRS[s][this.rot][n][1];
    this.move(toX, toY);
    return [toX, toY];
    // this.move(
    //   ...SRS[Math.max(...Object.values(mino)[this.shape][3]) - 1][this.rot]
    // );
  } // SRS 적용 함수 n=시도 횟수, r=회전방향
  rotate(d) {
    this.rot = (this.rot + d + 4) % 4;
  }
  move(x, y) {
    this.x += x;
    this.y += y;
  }
  draw() {
    let blocks = this.getBlocks();
    blocks.map((m) => {
      new Block(m[0], m[1], this.shape + 1).draw();
      return 0;
    });
  }
  colorlessDraw() {
    let blocks = this.getBlocks();
    blocks.map((m) => {
      new Block(m[0], m[1], 8).draw();
      return 0;
    });
  }
}
class Field {
  constructor() {
    this.matrix = Array.from(Array(10), () => Array(40).fill(0));
  }
  setBlock(x, y, c) {
    this.matrix[x][y] = c;
  }
  getBlock(x, y) {
    return this.matrix[x][y];
  }
  isInField(x, y) {
    if (x >= 0 && x < 10 && y >= 0 && y < 40) return true;
    return false;
  }
  findFilledLines() {
    let l = [];
    for (let i = 0; i < 40; i++) {
      if (
        this.matrix.every((a) => {
          return a[i] > 0;
        })
      )
        l.push(i);
    }
    return l;
  }
  clearLines(lines) {
    for (let i = 0; i < lines.length; i++) {
      this.matrix.map((m) => {
        m.splice(lines[i], 1);
        m.unshift(0);
        return 0;
      });
    }
  } // y행 라인클리어
  draw() {
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 10; j++) {
        new Block(j, i, this.matrix[j][i]).draw();
      }
    }
  }
}

class Next {
  static nextCount = 0;
  constructor(s) {
    this.order = nextCount;
    this.mino = this.setMino(s);
    nextCount++;
  }
  setMino(s) {
    return new Mino(14, 20 + 4 * this.order, s);
  }
  draw() {
    this.mino.draw();
  }
}

class Game {
  constructor() {
    this.nexts = this.randomGenerator();
    this.mino = this.spawnMino();
    this.ghost = null;
    this.field = new Field();
    this.hold = null;
    this.isUsedHold = false;
    this.harddrop = false;
    this.move = [0, 0];
    this.rotate = 0;
  }
  spawnMino() {
    let b = this.nexts.shift();
    let x = 3;
    if (b === 1) x = 4;
    return new Mino(x, 19, b);
  }
  fillNexts() {
    if (this.nexts.length < 7) {
      let nexts = this.randomGenerator();
      this.nexts.push(...nexts);
    }
  }
  setNexts(n, s) {
    return new Mino(14, 21 + 4 * n, s, 0);
  }
  drawNexts(n = 5) {
    let nexts = this.nexts.slice(undefined, n);
    nexts.map((m, i) => {});
    // let nexts = this.getNexts();
    // for (let i = 0; i < nexts.length; i++) {
    //   //
    // }
  }
  randomGenerator() {
    let minos = [0, 1, 2, 3, 4, 5, 6]; //Object.keys(mino).slice();
    let bag = [];
    for (let i = 0; i < Object.keys(mino).length; i++) {
      bag.push(...minos.splice(Math.floor(random(0, minos.length)), 1));
    }
    return bag;
  }
  isMovable(m, f) {
    let blocks = m.getBlocks();
    return blocks.every((b) => {
      return f.isInField(b[0], b[1]) && f.getBlock(b[0], b[1]) === 0;
    });
  }
  isRotatable(m, f) {
    return true;
  }
  cloneMino(x, y, s, r) {
    return new Mino(x, y, s, r);
  }
  drawGhost() {
    this.ghost = this.cloneMino(...Object.values(this.mino));
    while (this.isMovable(this.ghost, this.field)) {
      this.ghost.move(0, 1);
    }
    this.ghost.move(0, -1);
    this.ghost.colorlessDraw();
  }
  fixMino() {
    this.mino.getBlocks().map((m) => {
      this.field.setBlock(m[0], m[1], this.mino.shape + 1);
      return 0;
    });
    this.isUsedHold = false;
  }
  holdMino() {
    if (this.isUsedHold === true) return 0;
    if (this.hold === null) {
      [this.hold, this.mino] = [this.mino, this.hold];
      this.mino = this.spawnMino();
      this.hold.x = -4;
      this.hold.y = 21;
    } else {
      [this.hold.shape, this.mino.shape] = [this.mino.shape, this.hold.shape];
    }
    this.hold.rot = 0;
    this.mino.rot = 0;
    this.isUsedHold = true;
  }
  drawHold() {
    if (this.hold !== null) {
      if (this.isUsedHold === true) this.hold.colorlessDraw();
      else this.hold.draw();
    }
  }
  proc() {
    if (this.harddrop) {
      [this.mino.x, this.mino.y] = [this.ghost.x, this.ghost.y];
      this.fixMino();
      this.mino = this.spawnMino();
      this.harddrop = false;
    }
    if (this.move !== [0, 0]) {
      let b = this.cloneMino(...Object.values(this.mino));
      b.move(...this.move);
      if (this.isMovable(b, this.field)) this.mino.move(...this.move);
      this.move = [0, 0];
    }
    if (this.rotate !== 0) {
      let b = this.cloneMino(...Object.values(this.mino));
      b.rotate(this.rotate);
      for (let i = 0; i < 5; i++) {
        let pos = b.setSRS(i, this.rotate);
        if (this.isMovable(b, this.field)) {
          this.mino.rotate(this.rotate);
          this.mino.move(...pos);
          break;
        }
        b.move(-pos[0], -pos[1]);
      }
      this.rotate = 0;
    }
    let filledLines = this.field.findFilledLines();
    if (filledLines.length > 0) this.field.clearLines(filledLines);
    this.fillNexts();

    background(color.white);
    this.field.draw();
    this.drawGhost();
    this.mino.draw();
    this.drawHold();
    this.drawNexts();
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  game = new Game();
}
function draw() {
  game.proc();
}
function keyPressed() {
  if (keyCode === 82) game = new Game(); //r
  if (keyCode === UP_ARROW) game.rotate = 1;
  if (keyCode === DOWN_ARROW) game.move = [0, 1];
  if (keyCode === LEFT_ARROW) game.move = [-1, 0];
  if (keyCode === RIGHT_ARROW) game.move = [1, 0];
  if (keyCode === 32) game.harddrop = true; //space
  if (keyCode === 90) game.rotate = -1; //z
  if (keyCode === 16) game.holdMino();
  return false;
}
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
