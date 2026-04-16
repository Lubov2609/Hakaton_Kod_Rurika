let darkTimeout;
let progress = 0;

const bar = document.getElementById('progress');
const loader = document.getElementById('loader');
const rurikMenu = document.getElementById('rurikMenu');
const dark = document.getElementById('dark');
const menu = document.getElementById('menu');
const game = document.getElementById('game');

const startGame = document.getElementById('startGame');
const newGameBtn = document.getElementById('newGame');

const clickSound = document.getElementById('clickSound');
const doorSound = document.getElementById('doorSound');

const doors = document.getElementById('doors');
const hint = document.getElementById('hint');

// Переход на гланую страницу
function goHome() {
    window.location.href = "/";
}

function login() {
    window.location.href = "/login";
}

function goAbout() {
    window.open("https://disk.yandex.ru/i/Jsw4HbuxNAalHQ", "_blank", "noopener,noreferrer");
}



// ===== ЗАГРУЗКА =====
// Проверяем, был ли уже заход на сайт в этой сессии
const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

if (!hasLoadedBefore) {
    // Первый заход - показываем лоадер
    const loader = document.getElementById('loader');
    const bar = document.getElementById('progress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.style.display = 'none';
                // 👉 показываем меню Рюрика
                rurikMenu.style.display = 'block';
                // Отмечаем, что лоадер уже был показан
                sessionStorage.setItem('hasLoadedBefore', 'true');
            }, 300);
        }
        
        bar.style.width = progress + '%';
    }, 200);
} else {
    // Повторный заход - сразу показываем меню
    const loader = document.getElementById('loader');
    const rurikMenu = document.getElementById('rurikMenu'); // или как у вас называется переменная
    
    loader.style.display = 'none';
    rurikMenu.style.display = 'block';
}

// ===== КНОПКА В МЕНЮ РЮРИКА =====
startGame.addEventListener('click', () => {

    rurikMenu.style.display = 'none';

    dark.style.display = 'flex';

    setTimeout(() => {
        dark.style.opacity = '1';
    }, 50);

    // 👉 запускаем таймер автоперехода (5 сек)
    darkTimeout = setTimeout(() => {
        dark.style.display = 'none';
        menu.style.display = 'block';
    }, 5000);

});

// ===== КЛИК ПО ТЕМНОМУ ЭКРАНУ =====
dark.addEventListener('click', () => {

    // 👉 отменяем автопереход
    clearTimeout(darkTimeout);

    dark.style.display = 'none';
    menu.style.display = 'block';
});

// ===== СТАРАЯ КНОПКА =====
newGameBtn.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();

    setTimeout(() => {
        menu.style.display = 'none';
        game.style.display = 'block';

        setTimeout(() => {
            hint.style.display = 'flex';
        }, 3000);

    }, 200);
});

// ===== ДВЕРЬ =====
doors.addEventListener('click', () => {
    doorSound.currentTime = 0;
    doorSound.play();

    setTimeout(() => {
        window.location.href = "/scene2";
    }, 500);
});