(function() {
    'use strict';

    angular
        .module('inforsystemApp')
        .controller('ClienteController', ClienteController);

    ClienteController.$inject = ['$state', 'Cliente', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams', '$http'];

    function ClienteController($state, Cliente, ParseLinks, AlertService, paginationConstants, pagingParams, $http) {

        var vm = this;

        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.filtrarCliente = filtrarCliente;

        loadAll();        

        function filtrarCliente(campo, valor, limit){

            vm.dados= {
                campoConsulta: campo,
                valorConsulta: valor,
                limitConsulta: limit
            };

            $http.post("/api/clientesFiltrar", vm.dados)
           .success(function(result) {
                console.log("Sucesso ao filtrar",result);
                vm.clientes = result;
           })
           .error(function(status){
               console.log("Erro ao filtrar",status);
           })

        }
        

        function loadAll () {
            Cliente.query({
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.clientes = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }
    }
})();
