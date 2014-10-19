'use strict';

angular.module('curatesApp')
  .controller('CreateCtrl', function ($scope, Collections, Auth, $state) {
    $scope.message = 'Hello';

    var collection = $scope.collection = {
      user_id: Auth.getCurrentUser().user.id
    };

    $scope.create = function () {
      Collections.addCollection(collection)
        .then(function(collection) {
          $state.go('edit', {id: collection.data.id});
        });
    };
  });
