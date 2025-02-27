console.log("Script carregado");

const links = document.querySelectorAll('.site-header-nav ul li a');

links.forEach(link => {
    link.addEventListener('click', function () {
        links.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

const dropdown = document.querySelector('.dropdown');
const dropbtn = document.querySelector('.dropbtn');

dropbtn.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.classList.toggle('show');
});


window.addEventListener('click', function (event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
});

document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('click', function () {
        window.location.href = this.getAttribute('data-url');
    });
});