app.service('contactService', function ($http, $q) {
  var baseUrl = 'http://localhost:64385/api/';
  
  this.saveContact = function (contact) {
    var deferred = $q.defer()    
    $http.post(baseUrl + 'Clients/AddContactInformation', JSON.stringify(contact)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.editContact = function (contact) {
    var deferred = $q.defer()    
    $http.post(baseUrl + 'Clients/EditContactInformation', JSON.stringify(contact)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

  this.deleteContact = function (contact) {
    var deferred = $q.defer()    
    $http.post(baseUrl + 'Clients/DeleteContactInformation', JSON.stringify(contact)).then(function (data) {        
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
  }

});