window.app = window.app || angular.module('schoolApp', []);

app.controller('AppController', function ($scope, UsuarioService, $interval) {
    $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";

    $scope.filtro = '';
    $scope.filtroTipo = '';
    $scope.salvando = false;
    $scope.mensagemSucesso = "";
    $scope.mensagemErro = "";
    $scope.novoUsuario = {};
    $scope.rmAtual = UsuarioService.gerarCodigo();

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

        $scope.novoUsuario.rm = $scope.rmAtual;

        UsuarioService.salvar($scope.novoUsuario)
            .then((mensagem) => {
                $scope.mensagemSucesso = mensagem;
                $scope.novoUsuario = {};
                $scope.rmAtual = UsuarioService.gerarCodigo();
                form.$setPristine();
                form.$setUntouched();
                $scope.atualizarLista();
                contarUsuariosHoje();
                gerarGrafico();
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
        contarUsuariosHoje();
        gerarGrafico();
    };

    $scope.isEmailValid = function (email) {
        return email && email.endsWith('.com');
    };

    $scope.usuario = UsuarioService.listar()[1] || { nome: "Usuário", tipo: "Aluno" };
    $scope.horaAtual = "";
    $scope.usuariosHoje = 0;

    function atualizarHora() {
        const agora = new Date();
        $scope.horaAtual = agora.toLocaleTimeString();
    }

    function contarUsuariosHoje() {
        const hoje = new Date().toDateString();
        $scope.usuariosHoje = $scope.usuarios.filter(user => new Date(user.dataCadastro).toDateString() === hoje).length;
    }

    function gerarGrafico() {
        const hoje = new Date();
        const labels = ['Hoje', 'Ontem', '2 dias atrás', '3 dias atrás'];
        const dados = [0, 0, 0, 0];

        $scope.usuarios.forEach(user => {
            const dataUsuario = new Date(user.dataCadastro);
            const diffDias = Math.floor((hoje - dataUsuario) / (1000 * 60 * 60 * 24));
            if (diffDias >= 0 && diffDias < 4) {
                dados[diffDias]++;
            }
        });

        const ctx = document.getElementById('cadastrosChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cadastros',
                        data: dados,
                        backgroundColor: '#0d3749'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            ticks: {
                                color: '#0d3749',
                                font: {
                                    size: 14
                                },
                                beginAtZero: true,
                                precision: 0
                            }
                        }
                    }
                }
            });
        }
    }

    $interval(atualizarHora, 1000);
    atualizarHora();
    $scope.atualizarLista();
    contarUsuariosHoje();
    gerarGrafico();
});