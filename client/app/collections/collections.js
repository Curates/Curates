'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('collections', {
        url: '/collections',
        templateUrl: 'app/collections/collections.html',
        controller: 'CollectionsCtrl'
      });
  });