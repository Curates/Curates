'use strict';

angular.module('curatesApp')
  .controller('MainCtrl', function ($scope, $http, collections) {
    $scope.collections = collections;
  });
