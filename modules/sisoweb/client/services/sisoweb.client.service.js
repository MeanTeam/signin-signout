'use strict';

//sisoweb service used for communicating with the sisoweb REST endpoints
angular.module('sisoweb').factory('Sisoweb', ['$resource',
  function ($resource) {
    console.log('Query called on client side');  
    return $resource('api/sisoweb/:sisowebId', {
      sisowebId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      get: {
        method: 'GET'
      }
    }, {
      listByManager: {
        method: 'GET', isArray: true
      }
    }, {
      query: {       
        method: 'GET', isArray: true
      }
    });
  }
]);
