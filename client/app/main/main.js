'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          collections: function(Collections) {
            return Collections.fetchAll()
              .then(function(collections) {
                return collections.data;
              });
          }
        }
      });
  });