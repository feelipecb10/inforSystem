(function() {
    'use strict';

    angular
        .module('inforsystemApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Auth'];

    function HomeController ($scope, Principal, LoginService, $state, Auth) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                console.log(vm.account);
                
                if (vm.account == null || vm.account == undefined){
                    LoginService.open();
                    console.log("não autenticado");
                    
                }else{
                    $state.go("cliente");
                    console.log("autenticado");
                }
            });
        }
        function register () {
            /*$state.go('register');*/

            vm.registerAccount.firstName = vm.firstName;
            
            console.log(vm.registerAccount);
            Auth.createAccount(vm.registerAccount).then(function() {
                alert("Cadastrado com Sucesso!");
            }).catch(function() {
                alert("Erro ao Cadastrar");
            })
        }
    }
})();
