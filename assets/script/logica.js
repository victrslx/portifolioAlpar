import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAPhvZ82Kzvg6Z0Vi2XLZsZO7BB32bR1WU",
    authDomain: "portifolio-alpar.firebaseapp.com",
    projectId: "portifolio-alpar",
    storageBucket: "portifolio-alpar.firebasestorage.app",
    messagingSenderId: "885201159652",
    appId: "1:885201159652:web:3c456616679bdf8d62f3f1",
    measurementId: "G-J8HG60CDBD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado");

    document.querySelector(".submit-btn").addEventListener("click", async function (e) {
        e.preventDefault();

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const topic = document.getElementById("topic").value;
        const message = document.getElementById("message").value;

        if (!firstName || !lastName || !email || !message) {
            alert("Por favor, preencha os campos obrigatórios!");
            return;
        }

        try {
            await addDoc(collection(db, "contacts"), {
                firstName,
                lastName,
                email,
                phone,
                topic,
                message,
                timestamp: serverTimestamp()
            });

            alert("Mensagem enviada com sucesso!");

            // Reseta o formulário corretamente
            const form = document.getElementById("contact-form");
            if (form) {
                form.reset();
            } else {
                console.error("Formulário não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao enviar mensagem: ", error);
            alert("Erro ao enviar mensagem. Tente novamente.");
        }
    });

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
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    document.querySelectorAll('.expertise-card').forEach(card => {
        card.addEventListener('click', function () {
            window.location.href = this.getAttribute('data-url');
        });
    });
});