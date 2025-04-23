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

// 🛠 Restaura instâncias reais
function restaurarUsuarios(dados) {
    return dados.map(u => {
        if (u._turma) return new Aluno(u._name, u._email, u._password, u._turma);
        if (u._materias) return new Professor(u._name, u._email, u._password, u._materias);
        return new Usuario(u._name, u._email, u._password);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // 🧠 Inicialização do sessionStorage com usuários padrão (se vazio)
    if (!sessionStorage.getItem("usuarios")) {
        const usuariosIniciais = [
            new Aluno("João", "joao@email.com", "1234", "a"),
            new Professor("Maria", "maria@email.com", "abcd", "Matemática"),
        ];
        sessionStorage.setItem("usuarios", JSON.stringify(usuariosIniciais));
        location.reload();
    }

    // 📥 Carrega os usuários da sessão
    const dadosSessao = JSON.parse(sessionStorage.getItem("usuarios"));
    const usuarios = restaurarUsuarios(dadosSessao || []);

    console.log("🔥 Usuários carregados (alunos e professores):", usuarios);

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
            if (callback) callback(); // Executa o callback após o fechamento do popup
        });
    }

    // 🔐 LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            console.log("🔥 Tentativa de login - Email:", email, "Senha:", password);

            const user = usuarios.find(u => u.email === email && u.password === password);
            if (user) {
                console.log("🔥 Login bem-sucedido:", user);
                localStorage.setItem("usuarioLogado", JSON.stringify(user));
                exibirPopup("Login realizado com sucesso!", () => {
                    window.location.href = "index.html";
                });
            } else {
                console.log("🔥 Login falhou. Credenciais inválidas.");
                exibirPopup("Credenciais inválidas.");
            }
        });
    }

    // 📝 REGISTRO
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const tipo = document.getElementById("tipo").value;

            console.log("🔥 Dados do registro - Nome:", name, "Email:", email, "Senha:", password, "Tipo:", tipo);

            if (usuarios.some(u => u.email === email)) {
                console.log("🔥 Registro falhou. E-mail já cadastrado:", email);
                exibirPopup("E-mail já cadastrado.");
                return;
            }

            let novoUsuario = null;
            if (tipo === "aluno") {
                const turma = document.getElementById("turma").value.trim();
                if (!turma) return exibirPopup("Preencha o campo Turma.");
                novoUsuario = new Aluno(name, email, password, turma);
                console.log("🔥 Novo aluno cadastrado:", novoUsuario);
            } else if (tipo === "professor") {
                const materias = document.getElementById("materias").value.trim();
                if (!materias) return exibirPopup("Preencha o campo Matérias.");
                novoUsuario = new Professor(name, email, password, materias);
                console.log("🔥 Novo professor cadastrado:", novoUsuario);
            } else {
                return exibirPopup("Tipo de usuário inválido.");
            }

            usuarios.push(novoUsuario);
            sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
            console.log("🔥 Usuários após registro:", usuarios);

            exibirPopup("Usuário registrado com sucesso!", () => {
                window.location.href = "login.html";
            });
        });
    }

    // 👤 PERFIL
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

    // 🔥 Log ao retornar para a tela de login
    if (loginForm) {
        console.log("🔥 Dados atuais no sistema (usuários):", usuarios);
    }
});
