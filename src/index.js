const canvas = document.getElementById('canvas');
const button = document.getElementById('collapse');
const inputColor = document.getElementById('color');
const inputLineWidth = document.getElementById('lineWidth');
const ctx = canvas.getContext('2d');

let coord = { x: 0, y: 0 };
let color = null;
let lineWidth = 5;

document.addEventListener('mousedown', start);

inputColor.addEventListener('input', onColorInputChange);
inputLineWidth.addEventListener('change', onLineWidthChange);

function onColorInputChange(event) {
  console.log('onInput', event.target.value);
  color = event.target.value;
}

function onLineWidthChange(event) {
  lineWidth = event.target.value;
  console.log('onLineWidthChange', event.target.value);
}

function setPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function start(event) {
  if (event.target.id !== 'canvas') return;
  console.log('start');

  setPosition(event);
  document.addEventListener('mousemove', draw);
}

function draw(event) {
  if (event.target.id !== 'canvas') return;
  console.log('draw');
  document.removeEventListener('mousedown', start);
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.moveTo(coord.x, coord.y);
  ctx.stroke();
  setPosition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.lineCap = 'round';
  ctx.stroke();
  document.addEventListener('mouseup', stop);
}

function stop(event) {
  if (event.target.id !== 'canvas') return;
  console.log('stop');
  document.removeEventListener('mousemove', draw);

  setPosition(event);
  color = null;
  document.removeEventListener('mouseup', stop);
  document.addEventListener('mousedown', start);
}

button.addEventListener('click', clearDrawings);

const canvasSpinning = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' },
];

const canvasTiming = {
  duration: 500,
  iterations: 1,
};

function clearDrawings() {
  if (!coord.x && !coord.y) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.animate(canvasSpinning, canvasTiming);
}
