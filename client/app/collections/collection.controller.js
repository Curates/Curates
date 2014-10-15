angular.module('curatesApp')
  .controller('CollectionCtrl', function ($scope, collection) {
    $scope.collection = collection;

    console.log($scope.collection)

});