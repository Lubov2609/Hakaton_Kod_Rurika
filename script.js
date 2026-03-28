function startGame() {
  document.body.innerHTML = `
    <div class="intro">
      <h1>2121 год</h1>
      <p>Кампус School 21, Великий Новгород</p>
      <button onclick="goToDoor()">Продолжить</button>
    </div>
  `;
}

function goToDoor() {
  document.body.innerHTML = `
    <div class="scene">
      <h2>Перед тобой дверь "СКЛАД"</h2>
      <button onclick="enterStorage()">Открыть дверь</button>
    </div>
  `;
}

function enterStorage() {
  document.body.innerHTML = `
    <div class="scene">
      <h2>Склад</h2>
      <p>Ого как много пыли! Сюда никто не заходил уже 100 лет...</p>
      <button onclick="startVending()">Включить автомат</button>
    </div>
  `;
}

function startVending() {
  document.body.innerHTML = `
    <div class="scene">
      <h2>Включи автомат</h2>
      <p>Расставь шаги в правильном порядке:</p>

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
    alert("✅ Правильно! Автомат включен");
  } else {
    alert("❌ Неправильно! Попробуй еще");
  }
}

function enableDrag() {
  const list = document.getElementById("steps");
  let dragged;

  list.addEventListener("dragstart", e => {
    dragged = e.target;
  });

  list.addEventListener("dragover", e => {
    e.preventDefault();
  });

  list.addEventListener("drop", e => {
    if (e.target.tagName === "LI") {
      list.insertBefore(dragged, e.target);
    }
  });
}

function exitGame() {
  alert("Выход из игры");
}