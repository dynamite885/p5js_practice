/* eslint-disable no-undef, no-unused-vars */
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

const row = [];
for (let i = 0; i < 40; i++) {
  row[i] = 0;
}
const matrix = new Array(10);
for (let i = 0; i < matrix.length; i++) {
  matrix[i] = [...row];
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(color.white);
  if (mouseIsPressed) {
    fill(color.black);
  } else {
    fill(color.white);
  }
  ellipse(mouseX - windowWidth / 2, mouseY - windowHeight / 2, 80, 80);
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
