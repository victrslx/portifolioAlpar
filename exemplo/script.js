const horaSpan = document.querySelector('.hora');
setInterval(() => {
    horaSpan.innerHTML = new Date().toLocaleTimeString();
}, 1000);  