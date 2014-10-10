'use strict';

angular.module('curatesApp')
  .controller('CollectionsCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.userCollections = [];

    for (var i = 0; i <= 10; i++) {
      $scope.userCollections.push({
        rank: Math.floor(Math.random() * 100),
        title: 'some title of a user collection',
        description: 'some description here'
      });
    };    
  });
