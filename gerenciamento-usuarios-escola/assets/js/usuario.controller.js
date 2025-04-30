window.app = window.app || angular.module('schoolApp', []);

app.controller('AppController', function ($scope, UsuarioService) {
    $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";

    $scope.filtro = '';
    $scope.filtroTipo = '';
    $scope.usuarios = UsuarioService.listar($scope.filtro, $scope.filtroTipo);
    $scope.salvando = false;
    $scope.mensagemSucesso = "";
    $scope.mensagemErro = "";

    $scope.atualizarLista = function () {
        $scope.usuarios = UsuarioService.listar($scope.filtro, $scope.filtroTipo);
    };

    $scope.adicionarUsuario = function (form) {
        if (form.$invalid) {
            return;
        }

        $scope.salvando = true;
        $scope.mensagemSucesso = "";
        $scope.mensagemErro = "";

        UsuarioService.salvar($scope.novoUsuario)
            .then((mensagem) => {
                $scope.mensagemSucesso = mensagem;
                $scope.novoUsuario = {};
                form.$setPristine();
                form.$setUntouched();
                $scope.atualizarLista();
            })
            .catch((erro) => {
                $scope.mensagemErro = erro;
            })
            .finally(() => {
                $scope.salvando = false;
                $scope.$apply();
            });
    };

    $scope.removerUsuario = function (index) {
        UsuarioService.remover(index);
        $scope.atualizarLista();
    };

    $scope.isEmailValid = function (email) {
        return email && email.endsWith('.com');
    };

    $scope.atualizarLista();
});