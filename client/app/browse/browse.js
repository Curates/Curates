'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('browse', {
        url: '/browse',
        templateUrl: 'app/browse/browse.html',
        controller: 'BrowseCtrl'
      });
  });