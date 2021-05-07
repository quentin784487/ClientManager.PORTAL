'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                var layout = "index.html";

                $urlRouterProvider.otherwise('/app/clients');

                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: layout
                    })
                    .state('app.clients', {
                      url: '/clients',
                      templateUrl: 'components/clients/clients.component.html'
                    })
                    .state('app.client', {
                        url: '/client',
                        params: { id: 0 },
                        templateUrl: 'components/client/client.component.html'
                    });                
            }
        ]
    );
