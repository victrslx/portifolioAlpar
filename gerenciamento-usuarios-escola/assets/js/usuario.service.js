window.app = window.app || angular.module('schoolApp', []);

app.service('UsuarioService', function () {
    const STORAGE_KEY = 'usuarios';
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        { nome: "João", tipo: "Aluno", dataCadastro: new Date() },
        { nome: "Maria", tipo: "Professor", dataCadastro: new Date() },
        { nome: "Carlos", tipo: "Aluno", dataCadastro: new Date() },
        { nome: "Ana", tipo: "Professor", dataCadastro: new Date() },
        { nome: "Pedro", tipo: "Aluno", dataCadastro: new Date() }
    ];

    function saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    }

    this.listar = function (filtro, filtroTipo) {
        return usuarios.filter(usuario => {
            const nomeMatch = !filtro || usuario.nome.toLowerCase().includes(filtro.toLowerCase());
            const tipoMatch = !filtroTipo || usuario.tipo === filtroTipo;
            return nomeMatch && tipoMatch;
        });
    };

    this.adicionar = function (usuario) {
        usuario.dataCadastro = new Date();
        usuarios.push(usuario);
        saveToStorage();
    };

    this.remover = function (index) {
        usuarios.splice(index, 1);
        saveToStorage();
    };
});
