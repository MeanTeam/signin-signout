'use strict';

// Setting up route
angular.module('sisoweb').config(['$stateProvider',
  function ($stateProvider) {
    // sisoweb state routing
    $stateProvider
      .state('sisoweb', {
        abstract: true,
        url: '/sisoweb',
        template: '<ui-view/>'
      })
   
      .state('sisoweb.checkIn', {
        url: '',
        templateUrl: 'modules/sisoweb/client/views/checkIn-sisoweb.client.view.html'
      })
      .state('sisoweb.checkOut', {
        url: '',
        templateUrl: 'modules/sisoweb/client/views/checkOut-sisoweb.client.view.html'
      })
      .state('sisoweb.delete', {
        url: '/:sisowebId',
        templateUrl: 'modules/sisoweb/client/views/delete-sisoweb.client.view.html'
      })
      .state('sisoweb.listBy', {
        url: '',
        templateUrl: 'modules/sisoweb/client/views/listBy-sisoweb.client.view.html'
      });
  }
]);
