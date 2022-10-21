const canvas = document.getElementById('canvas');
const button = document.getElementById('collapse');
const ctx = canvas.getContext('2d');

let coord = { x: 0, y: 0 };
let coordPath = [];
let allLines = [];
let intersection;

document.addEventListener('click', start);

function setPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
  coordPath.push({
    x: event.clientX - canvas.offsetLeft,
    y: event.clientY - canvas.offsetTop,
  });
}

function start(event) {
  console.log('start');
  if (event.target.id !== 'canvas') return;
  setPosition(event);
  document.addEventListener('mousemove', draw);
}

function getLine(start, end) {
  let line = [start, end];
  return line;
}

function setAllLines(line) {
  allLines.push(line);
}

function draw(event) {
  console.log('draw');
  document.removeEventListener('click', start);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
  ctx.moveTo(coord.x, coord.y);
  setPosition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
  document.addEventListener('click', stop);
}

function stop(event) {
  console.log('stop');
  document.removeEventListener('mousemove', draw);

  setPosition(event);

  let line = getLine(coordPath[0], coordPath[coordPath.length - 1]);
  setAllLines(line);
  console.log('allLines', allLines);
  let line1;
  let line2;
  if (allLines.length >= 2)
    for (let i = 0; i <= allLines.length; i++) {
      line1 = allLines[i];
      line2 = allLines[i + 1];
      console.log('line1', line1);
      console.log('line2', line2);
      if (line1 && line2)
        intersection = calculateIntersection(
          line1[0],
          line1[1],
          line2[0],
          line2[1]
        );
      console.log('intersection', intersection);
    }

  if (intersection)
    drawPoint(Math.ceil(intersection.x), Math.ceil(intersection.y));
  coordPath = [];
  document.removeEventListener('click', stop);
  document.addEventListener('click', start);
}

function calculateIntersection(p1, p2, p3, p4) {
  let c2x = p3.x - p4.x;
  let c3x = p1.x - p2.x;
  let c2y = p3.y - p4.y;
  let c3y = p1.y - p2.y;

  let d = c3x * c2y - c3y * c2x;

  if (d == 0) {
    throw new Error('Number of intersection points is zero or infinity.');
  }

  let u1 = p1.x * p2.y - p1.y * p2.x;
  let u4 = p3.x * p4.y - p3.y * p4.x;

  let px = (u1 * c2x - c3x * u4) / d;
  let py = (u1 * c2y - c3y * u4) / d;

  let p = { x: px, y: py };

  return p;
}

function drawPoint(x, y) {
  ctx.fillStyle = 'red';
  ctx.beginPath();

  ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
  ctx.fill();
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
  intersection = null;
}
