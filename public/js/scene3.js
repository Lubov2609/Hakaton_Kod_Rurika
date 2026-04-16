// ===== ЗВУК =====
const sound = document.getElementById("bgSound");
const soundBtn = document.getElementById("soundBtn");

let unlocked = localStorage.getItem("audioUnlocked") === "true";

if (unlocked) {
    sound.play().catch(()=>{});
}

let soundEnabled = localStorage.getItem("sound") !== "off";

window.addEventListener("click", () => {
    if (soundEnabled) {
        sound.volume = 0.5;
        sound.play();
    }
}, { once: true });

function updateSoundUI() {
    soundBtn.src = soundEnabled
        ? "/assets/sound-on.png"
        : "/assets/sound-off.png";
}

updateSoundUI();

function toggleSound() {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
        sound.play();
    } else {
        sound.pause();
    }

    localStorage.setItem("sound", soundEnabled ? "on" : "off");
    updateSoundUI();
}

// ===== ТЕКСТ =====
const textLeft = "Эй! Иди со мной! Поможешь — и я тебе помогу";
const textRight = "Что это было? Где я? Как вернуться?";

let speed = 25;

function typeText(el, text, callback) {
    let i = 0;
    let interval = setInterval(() => {
        el.innerHTML += text[i];
        i++;

        if (i >= text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

window.onload = () => {
    typeText(text1, textLeft, () => {
        setTimeout(() => {
            typeText(text2, textRight, () => {
                choiceBtn.disabled = false;
                choiceBtn.classList.add("show");
            });
        }, 500);
    });
};

// ===== ПЕРЕХОД =====
function goNext() {
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "/quest1";
    }, 600);
}

// ===== МЕНЮ =====
function toggleMenu() {
    menu.classList.toggle("show");
}

function resumeGame() {
    toggleMenu();
}

function goHome() {
    window.location.href = "/";
}

function restart() {
    window.location.reload();
}

// ПРОПУСК
document.addEventListener("click", () => {
    text1.innerHTML = textLeft;
    text2.innerHTML = textRight;

    choiceBtn.disabled = false;
    choiceBtn.classList.add("show");
});