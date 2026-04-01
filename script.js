   let progress = 0;
    const bar = document.getElementById('progress');
    const loader = document.getElementById('loader');
    const white = document.getElementById('white');

    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                loader.style.display = 'none';
                white.style.display = 'block';
            }, 300);
        }
        bar.style.width = progress + '%';
    }, 200);