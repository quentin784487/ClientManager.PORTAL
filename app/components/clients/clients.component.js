'use strict';


app.controller('ClientManagementController', ['$scope', '$state', '$rootScope', 'clientService', '$uibModal', 'toaster', function ($scope, $state, $rootScope, clientService, $uibModal, toaster) {

  $scope.init = function () {
    $scope.filterArgs = {};
    $scope.clients = [];

    $scope.maxSize = 5;
    $scope.totalCount = 0;
    $scope.pageIndex = 1;
    $scope.pageSizeSelected = 5;
    getClients();
  }

  $scope.onCrudOpen = function (client) {
    $state.go('app.client', { id: client == null ? 0 : client.id });
  }

  $scope.onRefresh = function () {
    getClients();
  }

  $scope.onExportData = function () {
    clientService.exportClients().then(function (data) {
      var anchor = angular.element('<a/>');
      anchor.attr({
        href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data.data),
        target: '_blank',
        download: 'filename.csv'
      })[0].click();
      toaster.pop('Download', "Success", "Client successfully downloaded!");
    });
  }

  $scope.$watch('filterArgs.gender', function () {
    if ($scope.filterArgs.gender == undefined || $scope.filterArgs.gender == '') {
      $scope.filterArgs.gender = null;
    }
  });

  $scope.pageChanged = function () {
    getClients();
  };

  function getClients() {
    $scope.filterArgs.pageSize = $scope.pageSizeSelected;
    $scope.filterArgs.pageIndex = $scope.pageIndex;
    clientService.getClients($scope.filterArgs).then(function (response) {
      debugger;
      $scope.clients = response.data.clients;
      $scope.totalCount = response.data.totalCount;
    });
  }

  $scope.openDeleteModal = function (client) {
    var modalInstance = $uibModal.open({
      templateUrl: 'deleteModalContent.html',
      controller: 'DeleteClientController',
      size: 'md',
      backdrop: 'static',
      resolve: {
        client: function () {
          return client;
        }
      }
    });

    modalInstance.result.then(function (client) {
      debugger;
      var index = $scope.clients.indexOf(client);
      $scope.clients.splice(index, 1);
      toaster.pop('Delete client', "Success", "Client successfully deleted!");
    });
  };
}]);

app.controller('DeleteClientController', ['$scope', '$uibModalInstance', 'clientService', 'client', function ($scope, $uibModalInstance, clientService, client) {
  $scope.action = 'Client';
  $scope.ok = function () {
    clientService.deleteClient(client).then(function () {
      $uibModalInstance.close(client);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);