'use strict';

app.controller('ClientCrudController', ['$scope', '$state', '$stateParams', '$uibModal' ,'$rootScope', 'clientService', 'toaster', function ($scope, $state, $stateParams, $uibModal, $rootScope, clientService, toaster) {  

  $scope.client = {
    addressInformation: [],
    contactInformation: []
  };

  $scope.init = function () {
    $scope.client.id = $stateParams.id;
    if ($stateParams.id) {
      getClient($stateParams.id);
    }    
  } 

  function getClient(id) {
    clientService.getClient(id).then(function(client){
      $scope.client = client.data;         
    });
  }

  $scope.saveClient = function() {
    if ($stateParams.id) {
      clientService.editClient($scope.client).then(function(){
        toaster.pop('Edit Client', "Success", "Client successfully updated!");
        $state.go('app.clients');
      });    
    } else {
      clientService.addClient($scope.client).then(function(){
        toaster.pop('Save Client', "Success", "Client successfully saved!");
        $state.go('app.clients');
      });     
    }    
  }  

  $scope.openAddressModal = function (addressInformation) {
    var modalState = addressInformation != undefined ? 'Edit' : 'Add';
    if (!addressInformation) {
      addressInformation = {
        clients_Id: $stateParams.id
      }
    }

    var modalInstance = $uibModal.open({
      templateUrl: 'addressModalContent.html',
      controller: 'AddressInformationController',
      size: 'lg',
      backdrop: 'static',
      resolve: {
        clientState: function () {
          return $stateParams.id != 0 ? 'Edit' : 'Add';
        },
        modalState: function () {
          return modalState;
        },
        address: function () {
          return addressInformation;
        },
        stashedAddress: function () {
          if (addressInformation) {
            var stashedAddress = {};
            stashedAddress.id = addressInformation.id;
            stashedAddress.type = addressInformation.type;
            stashedAddress.addressLine1 = addressInformation.addressLine1;
            stashedAddress.addressLine2 = addressInformation.addressLine2;
            stashedAddress.addressLine3 = addressInformation.addressLine3;
            stashedAddress.postalCode = addressInformation.postalCode;
            return stashedAddress;
          } else {
            return null;
          }          
        } 
      }
    });

    modalInstance.result.then(function (address) {
      debugger;
      if (modalState == 'Add') {
        toaster.pop('Add Address', "Success", "Address successfully added!");
        $scope.client.addressInformation.push(address);
      } else {
        toaster.pop('Edit Address', "Success", "Address successfully updated!");
      } 
    });
  };

  $scope.openContactModal = function (contactInformation) {  
    var modalState = contactInformation != undefined ? 'Edit' : 'Add';   
    
    if (!contactInformation) {
      contactInformation = {
        clients_Id: $stateParams.id
      }
    }
    
    var modalInstance = $uibModal.open({
      templateUrl: 'contactModalContent.html',
      controller: 'ContactInformationController',
      size: 'sm',
      backdrop: 'static',
      resolve: {
        clientState: function () {
          return $stateParams.id != 0 ? 'Edit' : 'Add';
        },
        modalState: function () {
          return modalState;
        },
        contact: function () {
          return contactInformation;
        },
        stashedContact: function () {
          if (contactInformation) {
            var stashedContact = {};
            stashedContact.type = contactInformation.type;
            stashedContact.contactAddress = contactInformation.contactAddress;
            return stashedContact;
          } else {
            return null;
          }          
        } 
      }
    });

    modalInstance.result.then(function (contact) {  
      if (modalState == 'Add') {
        toaster.pop('Add Contact', "Success", "Contact successfully added!");
        $scope.client.contactInformation.push(contact);
      } else {
        toaster.pop('Edit Contact', "Success", "Contact successfully updated!");
      }     
    });
  };

  $scope.openDeleteModal = function (action, object) {
    var modalInstance = $uibModal.open({
      templateUrl: 'deleteModalContent.html',
      controller: 'DeleteInformationController',
      size: 'md',
      backdrop: 'static',
      resolve: {
        action: function () {
          return action;
        },
        object: function () {
          return object;
        },  
        clientState: function () {
          return $stateParams.id != 0 ? 'Edit' : 'Add';
        }
      }
    });

    modalInstance.result.then(function (object) {    
      debugger;     
      switch (action) {
        case 'address':
            var index = $scope.client.addressInformation.indexOf(object);
            $scope.client.addressInformation.splice(index, 1);    
            toaster.pop('Delete address', "Success", "Address successfully deleted!");
          break;
        case 'contact':
            var index = $scope.client.contactInformation.indexOf(object);
            $scope.client.contactInformation.splice(index, 1);    
            toaster.pop('Delete contact', "Success", "Contact successfully deleted!");
          break;
      }       
    });
  };    
  
}]);

app.controller('AddressInformationController', ['$scope', '$uibModalInstance', 'addressService', 'clientState', 'address', 'modalState', 'stashedAddress', function($scope, $uibModalInstance, addressService, clientState, address, modalState, stashedAddress) {
  $scope.address = address;
  $scope.modalState = modalState;

  $scope.ok = function () {    
    if (clientState == 'Edit') {
      if (modalState == 'Add') {
        addressService.saveAddress($scope.address).then(function(){
          $uibModalInstance.close($scope.address);
        });
      } else {
        addressService.editAddress(address).then(function(){
          $uibModalInstance.close($scope.address);
        });
      }      
    } else {      
      $uibModalInstance.close($scope.address);  
    }       
  };

  $scope.cancel = function () {
    if (stashedAddress) {
      $scope.address.type = stashedAddress.type;
      $scope.address.addressLine1 = stashedAddress.addressLine1;
      $scope.address.addressLine2 = stashedAddress.addressLine2;
      $scope.address.addressLine3 = stashedAddress.addressLine3;
      $scope.address.postalCode = stashedAddress.postalCode;
    }    
    $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('ContactInformationController', ['$scope', '$uibModalInstance', 'contactService', 'clientState', 'contact', 'modalState', 'stashedContact', function($scope, $uibModalInstance, contactService, clientState, contact, modalState, stashedContact) {
  $scope.contact = contact;
  $scope.modalState = modalState;    

  $scope.ok = function () {
    if (clientState == 'Edit') {
      if (modalState == 'Add') {
        contactService.saveContact($scope.contact).then(function(){
          $uibModalInstance.close($scope.contact);
        });
      } else {
        contactService.editContact($scope.contact).then(function(){
          $uibModalInstance.close($scope.contact);
        });
      }      
    } else {
      $uibModalInstance.close($scope.contact);
    }           
  };

  $scope.cancel = function () {
    if (stashedContact) {
      $scope.contact.type = stashedContact.type;
      $scope.contact.contactAddress = stashedContact.contactAddress; 
    }    
    $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('DeleteInformationController', ['$scope', '$uibModalInstance', 'addressService', 'contactService', 'object', 'action', 'clientState', function($scope, $uibModalInstance, addressService, contactService, object, action, clientState) {
  $scope.action = action;
  $scope.ok = function () {
    debugger;
    if (clientState == 'Edit') {
      switch (action) {
        case 'address':                   
          addressService.deleteAddress(object).then(function(){
            $uibModalInstance.close(object);
          });   
          break;
        case 'contact':
          contactService.deleteContact(object).then(function(){
            $uibModalInstance.close(object);
          }); 
          break;
      }    
    } else {
      $uibModalInstance.close(object);
    }              
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);