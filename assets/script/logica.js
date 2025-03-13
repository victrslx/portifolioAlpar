// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado");

    // fetch('https://firebase-backend-production-9ea4.up.railway.app/firebase-config', {
    //     headers: {
    //         'Authorization': 'Bearer token'
    //     }
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Acesso negado! Verifique seu token.');
    //         }
    //         return response.json();
    //     })
    //     .then(config => {
    //         const app = initializeApp(config);
    //         const db = getFirestore(app);

    //         document.querySelector(".submit-btn").addEventListener("click", async function (e) {
    //             e.preventDefault();

    //             const firstName = document.getElementById("first-name").value;
    //             const lastName = document.getElementById("last-name").value;
    //             const email = document.getElementById("email").value;
    //             const phone = document.getElementById("phone").value;
    //             const topic = document.getElementById("topic").value;
    //             const message = document.getElementById("message").value;

    //             if (!firstName || !lastName || !email || !message) {
    //                 alert("Por favor, preencha os campos obrigatórios!");
    //                 return;
    //             }

    //             try {
    //                 await addDoc(collection(db, "contacts"), {
    //                     firstName,
    //                     lastName,
    //                     email,
    //                     phone,
    //                     topic,
    //                     message,
    //                     timestamp: serverTimestamp()
    //                 });

    //                 alert("Mensagem enviada com sucesso!");

    //                 const form = document.getElementById("contact-form");
    //                 if (form) {
    //                     form.reset();
    //                 } else {
    //                     console.error("Formulário não encontrado!");
    //                 }
    //             } catch (error) {
    //                 console.error("Erro ao enviar mensagem: ", error);
    //                 alert("Erro ao enviar mensagem. Tente novamente.");
    //             }
    //         });

    //     })
    //     .catch(error => console.error('Erro ao buscar configuração:', error));

    const links = document.querySelectorAll('.navbar-collapse ul li a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('.expertise-card').forEach(card => {
        card.addEventListener('click', function () {
            window.location.href = this.getAttribute('data-url');
        });
    });
});