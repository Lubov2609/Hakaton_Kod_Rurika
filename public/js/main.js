console.log("Frontend assets loaded");

// пример будущих функций
function notify(msg) {
    console.log("NOTIFY:", msg);
}

// Toast функция
function showToast(message, success = true) {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';

    container.innerHTML = `
        <div class="toast show text-white bg-${success ? 'success' : 'danger'}">
            <div class="toast-body">${message}</div>
        </div>
    `;

    document.body.appendChild(container);

    setTimeout(() => container.remove(), 3000);
}

// AJAX форма
async function handleForm(form, url) {
    const formData = new FormData(form);

    const dataObj = {};
    formData.forEach((value, key) => {
        dataObj[key] = value;
    });

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    });

    const data = await res.json();

    showToast(data.message, data.success);

    if (data.success && data.redirect) {
        setTimeout(() => {
            window.location.href = data.redirect;
        }, 1000);
    }
}

// logout
async function logout() {
    const res = await fetch('/logout');
    const data = await res.json();

    showToast(data.message, true);

    setTimeout(() => {
        window.location.href = data.redirect;
    }, 1000);
}

// получение аватара по email
function getGravatarUrl(email) {
    if (!email) return null;

    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}