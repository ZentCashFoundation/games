const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const baseSize = 600; // 🔥 tamaño original
const grid = 20;

let scale = 1;

function resizeCanvas() {
  const size = canvas.clientWidth;

  canvas.width = size;
  canvas.height = size;

  scale = size / baseSize;

  // 🔥 ESCALAR TODO (la magia)
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ---------------- TU CÓDIGO ORIGINAL ----------------

let count = 0;
let gameOver = false;
let score = 0;

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

let apple = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;

  score = 0;
  scoreEl.textContent = score;

  gameOver = false;
}

function drawRoundedRect(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, size - 1, size - 1, 6);
  ctx.fill();
}

function loop() {
  if (gameOver) return;

  requestAnimationFrame(loop);

  if (++count < 8) return;
  count = 0;

  // 🔥 limpiar usando tamaño BASE (importante)
  ctx.clearRect(0, 0, baseSize, baseSize);

  snake.x += snake.dx;
  snake.y += snake.dy;

  // colisión paredes
  if (
    snake.x < 0 ||
    snake.x >= baseSize ||
    snake.y < 0 ||
    snake.y >= baseSize
  ) {
    if (!gameOver) {
      gameOver = true;
      sendScore?.();
      alert('¡Game Over! Puntuación: ' + score);
    }
    return;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // 🍎 manzana
  let gradient = ctx.createRadialGradient(
    apple.x + 10, apple.y + 10, 2,
    apple.x + 10, apple.y + 10, 10
  );
  gradient.addColorStop(0, '#ff8080');
  gradient.addColorStop(1, '#cc0000');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(apple.x + 10, apple.y + 10, 9, 0, Math.PI * 2);
  ctx.fill();

  // 🐍 serpiente
  snake.cells.forEach(function(cell, index) {
    let color = index === 0 ? '#00ffcc' : '#00cc66';
    drawRoundedRect(cell.x, cell.y, grid, color);

    // comer
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      scoreEl.textContent = score;

      apple.x = getRandomInt(0, 20) * grid;
      apple.y = getRandomInt(0, 20) * grid;
    }

    // colisión cuerpo
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        if (!gameOver) {
          gameOver = true;
          sendScore?.();
          alert('¡Game Over! Puntuación: ' + score);
        }
      }
    }
  });
}

// controles
document.addEventListener('keydown', function(e) {
  const key = e.key.toLowerCase();

  if ((key === 'arrowleft' || key === 'a') && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if ((key === 'arrowup' || key === 'w') && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if ((key === 'arrowright' || key === 'd') && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if ((key === 'arrowdown' || key === 's') && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start
//requestAnimationFrame(loop);