const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const pauseBtn = document.getElementById("pauseBtn");

const LANES = 3;
const MAX_OBSTACLES = 2;

let player, obstacles, score, level, keys, baseSpeed, roadOffset, paused;

function init(){
  player = { x: 80, y: laneY(1), w: 50, h: 30 };
  obstacles = [];
  score = 0;
  level = 1;
  baseSpeed = 2;
  keys = {};
  roadOffset = 0;
  paused = false;
  scoreEl.textContent = score;
  levelEl.textContent = level;
}

function laneY(i){
  let h = canvas.height / LANES;
  return i*h + h/2 - 15;
}

function drawCar(x,y,w,h,color){
  ctx.fillStyle=color; ctx.fillRect(x,y,w,h);
  ctx.fillStyle="#e7e7e7"; ctx.fillRect(x+10,y+5,25,20);
  ctx.fillStyle="black";
  ctx.fillRect(x+5,y-3,10,5); ctx.fillRect(x+w-15,y-3,10,5);
  ctx.fillRect(x+5,y+h-2,10,5); ctx.fillRect(x+w-15,y+h-2,10,5);
}

// 🪨 piedra (nuevo obstáculo)
function drawRock(x,y){
  ctx.fillStyle="#666";
  ctx.beginPath();
  ctx.arc(x+15,y+15,15,0,Math.PI*2);
  ctx.fill();
  ctx.fillStyle="#888";
  ctx.beginPath();
  ctx.arc(x+10,y+10,5,0,Math.PI*2);
  ctx.fill();
}

function drawRoad(){
  ctx.fillStyle="#444"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle="white"; ctx.setLineDash([20,20]);
  roadOffset += baseSpeed*2;
  for(let i=1;i<LANES;i++){
    let y = i*(canvas.height/LANES);
    ctx.beginPath();
    for(let x=-40;x<canvas.width;x+=40){
      ctx.moveTo(x-(roadOffset%40),y);
      ctx.lineTo(x+20-(roadOffset%40),y);
    }
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function spawnObstacle(){
  if(obstacles.length>=MAX_OBSTACLES) return;
  let lane = Math.floor(Math.random()*LANES);
  let type = Math.random()<0.5 ? "car" : "rock";
  obstacles.push({
    x: canvas.width,
    y: laneY(lane),
    w: type==="car"?50:30,
    h: type==="car"?30:30,
    type: type,
    speed: baseSpeed + Math.random()*level
  });
}

function update(){
  if(paused){ requestAnimationFrame(update); return; }

  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawRoad();

  // movimiento carriles
  if(keys["ArrowUp"]) {
    let c = Math.round((player.y+15)/(canvas.height/LANES)-0.5);
    if(c>0) player.y = laneY(c-1);
    keys["ArrowUp"]=false;
  }
  if(keys["ArrowDown"]) {
    let c = Math.round((player.y+15)/(canvas.height/LANES)-0.5);
    if(c<LANES-1) player.y = laneY(c+1);
    keys["ArrowDown"]=false;
  }

  drawCar(player.x,player.y,player.w,player.h,"lime");

  obstacles.forEach((o,i)=>{
    o.x -= o.speed;

    if(o.type==="car") drawCar(o.x,o.y,o.w,o.h,"red");
    else drawRock(o.x,o.y);

    // colisión
    if(
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ){
      paused = true;
      setTimeout(()=>{
		    sendScore(score);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        alert("💥 Game Over | Puntos: "+score);
      },100);
    }

    if(o.x + o.w < 0){
      obstacles.splice(i,1);
      score++;
      scoreEl.textContent=score;
      if(score%5===0){
        level++; levelEl.textContent=level; baseSpeed+=0.2;
      }
    }
  });

  if(Math.random()<0.02+level*0.003) spawnObstacle();

  requestAnimationFrame(update);
}

// pausa
pauseBtn.onclick = ()=>{
  paused = !paused;
  pauseBtn.textContent = paused ? "▶️ Reanudar" : "⏸️ Pausar";
};

window.addEventListener("keydown",e=>keys[e.key]=true);
window.addEventListener("keyup",e=>keys[e.key]=false);

function startGame(){
  init();
  update();
}
