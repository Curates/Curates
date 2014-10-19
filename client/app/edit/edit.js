'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit/{id}',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl',
        resolve: {
          collection: function(Collections, $stateParams) {
            return Collections.fetchCollection($stateParams.id)
              .then(function(collection) {
                return collection.data;
              });
          }
        }
      });
  });