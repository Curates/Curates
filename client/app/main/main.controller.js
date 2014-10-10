'use strict';

angular.module('curatesApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.collections = [];

    for (var i = 0; i <= 10; i++) {
      $scope.collections.push({
        rank: Math.floor(Math.random() * 100),
        title: 'some title of a collection' + i,
        description: 'some description here'
      });
    };
  });
