const canvas = document.getElementById('canvas');
const button = document.getElementById('collapse');
const ctx = canvas.getContext('2d');

let coord = { x: 0, y: 0 };

document.addEventListener('mousedown', start);

function setPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function start(event) {
  console.log('start');
  if (event.target.id !== 'canvas') return;
  setPosition(event);
  document.addEventListener('mousemove', draw);
}

function draw(event) {
  console.log('draw');
  document.removeEventListener('mousedown', start);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
  ctx.moveTo(coord.x, coord.y);
  setPosition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
  document.addEventListener('mouseup', stop);
}

function stop(event) {
  console.log('stop');
  document.removeEventListener('mousemove', draw);

  setPosition(event);
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
