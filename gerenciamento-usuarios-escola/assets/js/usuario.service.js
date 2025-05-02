window.app = window.app || angular.module('schoolApp', []);

app.service('UsuarioService', function () {
    const STORAGE_KEY = 'usuarios';
    let _usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        { nome: "João", tipo: "Aluno(a)", dataCadastro: new Date(), email: "joao@gmail.com", rm: 86641 },
        { nome: "Maria", tipo: "Professor(a)", dataCadastro: new Date(), email: "maria@gmail.com", rm: 12345 },
        { nome: "Carlos", tipo: "Aluno(a)", dataCadastro: new Date(), email: "carlos@gmail.com", rm: 54321 },
        { nome: "Ana", tipo: "Professor(a)", dataCadastro: new Date(), email: "ana@gmail.com", rm: 67890 },
        { nome: "Pedro", tipo: "Aluno(a)", dataCadastro: new Date(), email: "pedro@gmail.com", rm: 98765 }
    ];

    function saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(_usuarios));
    }

    function gerarCodigo() {
        let codigo;
        do {
            codigo = Math.floor(Math.random() * Math.pow(10, 5)) + 1;
        } while (_usuarios.some(usuario => usuario.rm === codigo));
        return codigo;
    }

    return {
        listar: function (filtro, filtroTipo) {
            return _usuarios.filter(usuario => {
                const nomeMatch = !filtro || usuario.nome.toLowerCase().includes(filtro.toLowerCase());
                const tipoMatch = !filtroTipo || usuario.tipo === filtroTipo;
                return nomeMatch && tipoMatch;
            });
        },
        adicionar: function (usuario) {
            usuario.dataCadastro = new Date();
            usuario.rm = gerarCodigo();
            _usuarios.push(usuario);
            saveToStorage();
        },
        remover: function (index) {
            _usuarios.splice(index, 1);
            saveToStorage();
        },
        salvar: function (usuario) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        usuario.dataCadastro = new Date();
                        _usuarios.push(usuario);
                        saveToStorage();
                        resolve("Usuário cadastrado com sucesso!");
                    } catch (error) {
                        reject("Erro ao salvar o usuário.");
                    }
                }, 2000);
            });
        },
        gerarCodigo: gerarCodigo
    };
});
