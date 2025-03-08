document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado");

    fetch('https://firebase-backend-production-9ea4.up.railway.app/firebase-config')
        .then(response => response.json())
        .then(config => {
            console.log('Configuração do Firebase carregada:', config);

            // Inicializa o Firebase com a configuração obtida
            const app = firebase.initializeApp(config);
            const db = firebase.firestore();

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
                    await db.collection("contacts").add({
                        firstName,
                        lastName,
                        email,
                        phone,
                        topic,
                        message,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
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

        })
        .catch(error => console.error('Erro ao buscar configuração:', error));
});
