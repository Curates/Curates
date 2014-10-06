'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userCollections', {
        url: '/userCollections',
        templateUrl: 'app/userCollections/userCollections.html',
        controller: 'UsercollectionsCtrl'
      });
  });