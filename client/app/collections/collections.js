'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('collections', {
        url: '/collections',
        templateUrl: 'app/collections/collections.html',
        controller: 'CollectionsCtrl',
        resolve: {
          collections: function(Auth, Collections) {
            var id = Auth.getCurrentUser().user.id;
            return Collections.fetchUserCollections(id)
              .then(function(collections) {
                return collections.data;
              });
          }
        }
      });
  });