let canvas, ctx;

let player, door;
let keys = {};
let gameRunning = false;

let cameraX = 0;

let heroImg = new Image();
heroImg.src = "assets/hero.png";

let doorImg = new Image();
doorImg.src = "assets/door.jpg";

let bgImg = new Image();
bgImg.src = "assets/corridor.jpg";

// размер уровня (шире экрана!)
const worldWidth = 2000;

function startGame() {
  document.querySelector(".game").style.display = "none";

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";

  player = {
    x: 100,
    y: canvas.height - 180,
    width: 80,
    height: 120,
    speed: 5
  };

  door = {
    x: 1600,
    y: canvas.height - 200,
    width: 100,
    height: 150
  };

  gameRunning = true;

  document.addEventListener("keydown", e => keys[e.key] = true);
  document.addEventListener("keyup", e => keys[e.key] = false);

  gameLoop();
}

function gameLoop() {
  if (!gameRunning) return;

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

function update() {
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;

  // границы
  if (player.x < 0) player.x = 0;
  if (player.x > worldWidth - player.width) player.x = worldWidth - player.width;

  // камера следует за игроком
  cameraX = player.x - canvas.width / 2;

  if (cameraX < 0) cameraX = 0;
  if (cameraX > worldWidth - canvas.width) {
    cameraX = worldWidth - canvas.width;
  }

  // проверка двери
  if (
    player.x < door.x + door.width &&
    player.x + player.width > door.x
  ) {
    document.getElementById("doorUI").style.display = "block";
  } else {
    document.getElementById("doorUI").style.display = "none";
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ФОН (растягиваем)
  ctx.drawImage(bgImg, -cameraX, 0, worldWidth, canvas.height);

  // ДВЕРЬ
  ctx.drawImage(
    doorImg,
    door.x - cameraX,
    door.y,
    door.width,
    door.height
  );

  // ПЕРСОНАЖ
  ctx.drawImage(
    heroImg,
    player.x - cameraX,
    player.y,
    player.width,
    player.height
  );
}

function enterStorage() {
  gameRunning = false;

  document.body.innerHTML = `
    <div class="scene">
      <h2>Склад</h2>
      <p>Ого как много пыли...</p>
      <button onclick="startVending()">Включить автомат</button>
    </div>
  `;
}

// --- твой квест ---

function startVending() {
  document.body.innerHTML = `
    <div class="scene">
      <h2>Включи автомат</h2>
      <p>Расставь шаги:</p>

      <ol id="steps">
        <li draggable="true">Нажать кнопку</li>
        <li draggable="true">Вставить вилку</li>
        <li draggable="true">Поднять аппарат</li>
        <li draggable="true">Взять вилку</li>
      </ol>

      <button onclick="checkSteps()">Проверить</button>
    </div>
  `;

  enableDrag();
}

function checkSteps() {
  const items = document.querySelectorAll("#steps li");
  const order = [...items].map(i => i.innerText);

  const correct = [
    "Поднять аппарат",
    "Взять вилку",
    "Вставить вилку",
    "Нажать кнопку"
  ];

  if (JSON.stringify(order) === JSON.stringify(correct)) {
    alert("✅ Правильно!");
  } else {
    alert("❌ Ошибка!");
  }
}

function enableDrag() {
  const list = document.getElementById("steps");
  let dragged;

  list.addEventListener("dragstart", e => dragged = e.target);
  list.addEventListener("dragover", e => e.preventDefault());
  list.addEventListener("drop", e => {
    if (e.target.tagName === "LI") {
      list.insertBefore(dragged, e.target);
    }
  });
}

function exitGame() {
  alert("Выход");
}