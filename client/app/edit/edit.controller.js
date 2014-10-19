'use strict';

angular.module('curatesApp')
  .controller('EditCtrl', function ($scope, Collections, $state, collection) {
    $scope.collection = collection;

    $scope.save = function () {
      Collections.editCollection(collection);
      $state.go('collections');
    };

  });
