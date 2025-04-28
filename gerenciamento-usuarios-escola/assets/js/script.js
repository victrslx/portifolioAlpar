var app = angular.module('schoolApp', []);

app.controller('AppController', function ($scope) {
    $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";
    $scope.usuario = {
        nome: "João",
        tipo: "Aluno"
    };
    $scope.usuarios = [
        { nome: "João", tipo: "Aluno", dataCadastro: new Date() },
        { nome: "Maria", tipo: "Professor", dataCadastro: new Date() },
        { nome: "Carlos", tipo: "Aluno", dataCadastro: new Date() },
        { nome: "Ana", tipo: "Professor", dataCadastro: new Date() },
        { nome: "Pedro", tipo: "Aluno", dataCadastro: new Date() }
    ];
});

app.controller('UserListController', function ($scope) {
    $scope.usuarios = $scope.$parent.usuarios;
});
