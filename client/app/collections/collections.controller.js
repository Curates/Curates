'use strict';

angular.module('curatesApp')
  .controller('CollectionsCtrl', function ($scope, collections) {
    $scope.message = 'Hello';

    $scope.userCollections = collections;

});
