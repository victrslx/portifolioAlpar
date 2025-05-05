class Usuario {
    constructor(name, email, password) {
        this._name = name;
        this._email = email;
        this._password = password;
    }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get email() { return this._email; }
    set email(value) { this._email = value; }

    get password() { return this._password; }
    set password(value) { this._password = value; }

    exibirPerfil() {
        return `Nome: ${this._name}, Email: ${this._email}`;
    }
}

class Aluno extends Usuario {
    constructor(name, email, password, turma) {
        super(name, email, password);
        this._turma = turma;
    }

    get turma() { return this._turma; }
    set turma(value) { this._turma = value; }

    exibirPerfil() {
        return `${super.exibirPerfil()}, Turma: ${this._turma}`;
    }
}

class Professor extends Usuario {
    constructor(name, email, password, materias) {
        super(name, email, password);
        this._materias = materias;
    }

    get materias() { return this._materias; }
    set materias(value) { this._materias = value; }

    exibirPerfil() {
        return `${super.exibirPerfil()}, Matérias: ${this._materias}`;
    }
}

function restaurarUsuarios(dados) {
    return dados.map(u => {
        if (u._turma) return new Aluno(u._name, u._email, u._password, u._turma);
        if (u._materias) return new Professor(u._name, u._email, u._password, u._materias);
        return new Usuario(u._name, u._email, u._password);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    if (!sessionStorage.getItem("usuarios")) {
        const usuariosIniciais = [
            new Aluno("João", "joao@email.com", "1234", "A"),
            new Professor("Maria", "maria@email.com", "abcd", "Matemática")
        ];
        sessionStorage.setItem("usuarios", JSON.stringify(usuariosIniciais));
        location.reload();
    }

    const dadosSessao = JSON.parse(sessionStorage.getItem("usuarios")) || [];
    const usuarios = restaurarUsuarios(dadosSessao);


    function exibirPopup(mensagem, callback) {
        const popup = document.createElement("div");
        popup.className = "modal fade";
        popup.id = "popupModal";
        popup.tabIndex = "-1";
        popup.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Mensagem</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${mensagem}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            `;
        document.body.appendChild(popup);

        const modal = new bootstrap.Modal(popup);
        modal.show();

        popup.addEventListener("hidden.bs.modal", () => {
            document.body.removeChild(popup);
            if (callback) callback();
        });
    }


    const themeToggle = document.getElementById("themeToggle");
    const themeBody = document.getElementById("themeBody");
    const themeCard = document.getElementById("themeCard");

    themeToggle.addEventListener("click", () => {
        const isDark = themeBody.classList.toggle("bg-dark");
        themeBody.classList.toggle("text-white", isDark);
        themeCard.classList.toggle("bg-dark", isDark);
        themeToggle.textContent = isDark ? "Modo Claro" : "Modo Escuro";
    });

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailField = document.getElementById("email");
            const passwordField = document.getElementById("password");

            const email = emailField.value.trim();
            const password = passwordField.value.trim();

            const usuariosCadastrados = JSON.parse(sessionStorage.getItem("usuarios")) || [];
            const usuariosRestaurados = restaurarUsuarios(usuariosCadastrados);

            const user = usuariosRestaurados.find(u => u.email === email && u.password === password);

            let isValid = true;

            if (!email || !emailField.checkValidity() || !user) {
                emailField.classList.add("is-invalid");
                emailField.classList.remove("is-valid");
                isValid = false;
            } else {
                emailField.classList.add("is-valid");
                emailField.classList.remove("is-invalid");
            }

            if (!password || (user && user.password !== password) || email !== user.email) {
                passwordField.classList.add("is-invalid");
                passwordField.classList.remove("is-valid");
                isValid = false;
            } else {
                passwordField.classList.add("is-valid");
                passwordField.classList.remove("is-invalid");
            }

            if (isValid && user) {
                console.log("🔥 Login bem-sucedido:", user);
                localStorage.setItem("usuarioLogado", JSON.stringify(user));
                window.location.href = "index.html";
            } else {
                console.log("🔥 Login falhou. Credenciais inválidas.");
                exibirPopup("Credenciais inválidas.");
            }
        });
    }


    const registerForm = document.getElementById("registerForm");
    const extraFields = document.getElementById("extraFields");

    function applyValidationListeners() {
        registerForm.querySelectorAll("input, select").forEach(field => {
            field.addEventListener("input", () => validateField(field));
            field.addEventListener("blur", () => validateField(field));
        });
    }

    function validateField(field) {
        if (!field.value.trim() || !field.checkValidity()) {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
        } else {
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
        }
    }

    document.getElementById("tipo").addEventListener("change", function () {
        extraFields.innerHTML = "";

        if (this.value === "aluno") {
            extraFields.innerHTML = `
                 <div class="mb-3">
                     <label for="turma" class="form-label">Turma:</label>
                     <input type="text" id="turma" name="turma" class="form-control" required>
                     <div class="invalid-feedback">Por favor, insira a turma.</div>
                 </div>
             `;
        } else if (this.value === "professor") {
            extraFields.innerHTML = `
                 <div class="mb-3">
                     <label for="materias" class="form-label">Matérias:</label>
                     <input type="text" id="materias" name="materias" class="form-control" required>
                     <div class="invalid-feedback">Por favor, insira as matérias.</div>
                 </div>
             `;
        }

        applyValidationListeners();
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        const fields = registerForm.querySelectorAll("input, select");
        fields.forEach(field => {
            validateField(field);
            if (!field.checkValidity() || !field.value.trim()) {
                isValid = false;
            }
        });

        if (!isValid) {
            console.log("❌ Formulário inválido.");
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const tipo = document.getElementById("tipo").value;

        if (usuarios.some(u => u.email === email)) {
            exibirPopup("E-mail já cadastrado.");
            return;
        }

        let novoUsuario = null;
        if (tipo === "aluno") {
            const turma = document.getElementById("turma").value.trim();
            novoUsuario = new Aluno(name, email, password, turma);
        } else if (tipo === "professor") {
            const materias = document.getElementById("materias").value.trim();
            novoUsuario = new Professor(name, email, password, materias);
        } else {
            exibirPopup("Tipo de usuário inválido.");
            return;
        }

        usuarios.push(novoUsuario);
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));

        exibirPopup("Usuário registrado com sucesso!", () => {
            window.location.href = "login.html";
        });
    });

    applyValidationListeners();

    const perfilContainer = document.getElementById("perfilContainer");
    if (perfilContainer) {
        const dados = localStorage.getItem("usuarioLogado");
        if (dados) {
            const user = JSON.parse(dados);
            let instancia;
            if (user._turma) {
                instancia = new Aluno(user._name, user._email, user._password, user._turma);
            } else if (user._materias) {
                instancia = new Professor(user._name, user._email, user._password, user._materias);
            } else {
                instancia = new Usuario(user._name, user._email, user._password);
            }
            console.log("🔥 Dados do usuário logado:", instancia);
            perfilContainer.innerHTML = `<p>${instancia.exibirPerfil()}</p>`;
        } else {
            perfilContainer.innerHTML = "<p>Nenhum usuário logado.</p>";
        }
    }

    if (loginForm) {
        console.log("🔥 Dados atuais no sistema (usuários):", usuarios);
    }
});
