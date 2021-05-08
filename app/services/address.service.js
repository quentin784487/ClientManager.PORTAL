app.service('addressService', function ($http, $q, settingsService) {
  
  this.saveAddress = function (address) {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Address/AddAddressInformation', JSON.stringify(address)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.editAddress = function (address) {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Address/EditAddressInformation', JSON.stringify(address)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.deleteAddress = function (address) {
    var deferred = $q.defer()    
    $http.post(settingsService.settings.baseUrl + 'Address/DeleteAddressInformation', JSON.stringify(address)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

});