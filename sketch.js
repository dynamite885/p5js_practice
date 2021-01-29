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
};

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
      this.y * cellSize - cellSize * 20 - windowHeight / 2,
      cellSize,
      cellSize
    );
    pop();
  }
}

class Mino {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.rot = 0;
  }
  draw() {
    Object.values(mino)[this.shape].map((m) => {
      new Block(m[0] + this.x, m[1] + this.y, this.shape + 1).draw();
      return 0;
    });
  }
}

class Field {
  constructor() {
    this.matrix = Array.from(Array(10), () => Array(40).fill(0));
  }
  draw() {
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 10; j++) {
        new Block(j, i, this.matrix[j][i]).draw();
      }
    }
  }
}

const F = new Field();
const matrix = F.matrix;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  // background(color.white);
  // F.draw();
  // for (let i in matrix) {
  //   for (let j in matrix[i]) {
  //     stroke(color.black);
  //     fill(color.white);
  //     strokeWeight(2);
  //     rect(
  //       i * cellSize - 5 * cellSize,
  //       j * cellSize - cellSize * 20 - windowHeight / 2,
  //       cellSize,
  //       cellSize
  //     );
  //   }
  // }
  // if (mouseIsPressed) {
  //   fill(color.black);
  // } else {
  //   fill(color.white);
  // }
  // ellipse(mouseX - windowWidth / 2, mouseY - windowHeight / 2, 80, 80);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
  }
  if (keyCode === DOWN_ARROW) {
  }
  if (keyCode === LEFT_ARROW) {
  }
  if (keyCode === RIGHT_ARROW) {
  }
  if (keyCode === 32) {
  }
  return false;
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
