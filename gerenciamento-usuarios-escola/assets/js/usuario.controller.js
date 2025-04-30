window.app = window.app || angular.module('schoolApp', []);

app.controller('AppController', function ($scope, UsuarioService) {
    $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";

    $scope.filtro = '';
    $scope.filtroTipo = '';
    $scope.usuarios = UsuarioService.listar($scope.filtro, $scope.filtroTipo);

    $scope.atualizarLista = function () {
        $scope.usuarios = UsuarioService.listar($scope.filtro, $scope.filtroTipo);
    };

    $scope.adicionarUsuario = function () {
        if ($scope.novoUsuario && $scope.novoUsuario.nome && $scope.novoUsuario.tipo) {
            UsuarioService.adicionar($scope.novoUsuario);
            $scope.novoUsuario = {};
            $scope.atualizarLista();
        }
    };

    $scope.removerUsuario = function (index) {
        UsuarioService.remover(index);
        $scope.atualizarLista();
    };

    $scope.atualizarLista();
});
