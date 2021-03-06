app.service('clientService', function ($http, $q, settingsService) {
  
  this.getClients = function (client) {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Clients/GetClients?pageIndex=' + client.pageIndex + '&pageSize=' + client.pageSize, JSON.stringify(client)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.getClient = function (id) {
    var deferred = $q.defer()    
    $http.get(settingsService.settings.baseUrl + 'Clients/GetClient?id=' + id).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.addClient = function (client) {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Clients/AddClient', JSON.stringify(client)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.editClient = function (client) {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Clients/EditClient', JSON.stringify(client)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.deleteClient = function (client) {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Clients/DeleteClient', JSON.stringify(client)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.exportClients = function () {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Clients/ExportClients').then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }
});