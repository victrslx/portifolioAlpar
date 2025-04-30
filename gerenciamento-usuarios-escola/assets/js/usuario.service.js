window.app = window.app || angular.module('schoolApp', []);

app.service('UsuarioService', function () {
    const STORAGE_KEY = 'usuarios';
    let _usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        { nome: "João", tipo: "Aluno", dataCadastro: new Date() },
        { nome: "Maria", tipo: "Professor", dataCadastro: new Date() },
        { nome: "Carlos", tipo: "Aluno", dataCadastro: new Date() },
        { nome: "Ana", tipo: "Professor", dataCadastro: new Date() },
        { nome: "Pedro", tipo: "Aluno", dataCadastro: new Date() }
    ];

    function saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(_usuarios));
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
        }
    };
});
