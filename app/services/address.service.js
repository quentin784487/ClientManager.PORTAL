app.service('addressService', function ($http, $q) {
  var baseUrl = 'http://localhost:64385/api/';
  
  this.saveAddress = function (address) {
    var deferred = $q.defer()    
    $http.post(baseUrl + 'Clients/AddAddressInformation', JSON.stringify(address)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.editAddress = function (address) {
    var deferred = $q.defer()    
    $http.post(baseUrl + 'Clients/EditAddressInformation', JSON.stringify(address)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.deleteAddress = function (address) {
    var deferred = $q.defer()    
    $http.post(baseUrl + 'Clients/DeleteAddressInformation', JSON.stringify(address)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

});