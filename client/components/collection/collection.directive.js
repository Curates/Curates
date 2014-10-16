'use strict';

angular.module('curatesApp')
  .directive('collection', function (Favorites, Collections, Auth, Votes, $state) {
    return {
      templateUrl: 'components/collection/collection.html',
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function (scope, element, attrs) {
        var expanded = false;
        
        scope.go = function(id) {
          $state.go('collections.id', {id: id});
        };

        scope.favorite = function(collection_id) {
          var user_id = Auth.getCurrentUser().user.id;
          Favorites.addFavorite({collection_id: collection_id, user_id: user_id});
        };

        scope.clone = function(collection){
          var user_id = Auth.getCurrentUser().user.id;
          if (collection.user_id === user_id) {
            return new Error('Cannot clone your own collections');
          }
          delete collection.id;
          Collections.addCollection({collection: collection, user_id: user_id});
        };

        scope.expand = function(event){
          if (expanded) {
            element.find('.links').css({
              height: 0
            });
            element.find('.expand').find('h4').text('click to expand');
          } else {
            element.find('.links').css({
              height: 200
            });        
            element.find('.expand').find('h4').text('click to collapse');
          }
          expanded = !expanded;
        };

        scope.upvote = function(collection_id){
          var user_id = Auth.getCurrentUser().user.id;
          Votes.addVote({collection_id: collection_id, user_id: user_id});
        };
      }
    };
  });