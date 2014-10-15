'use strict';

angular.module('curatesApp')
  .directive('collection', function (Favorites, Collections, Auth, $state) {
    return {
      templateUrl: 'components/collection/collection.html',
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function (scope, element, attrs) {
        var expanded = false;
        
        scope.go = function(id) {
          console.log(id)
          $state.go('collections.id', {id: id});
        };

        scope.favorite = function(collection_id) {
          var user_id = Auth.getCurrentUser().user.id;
          Favorites.addFavorite({collection_id: collection_id, user_id: user_id});
        };

        scope.clone = function(){
          // Collections.clone(thisone);
        };      

        scope.expand = function(event){
          if (expanded) {
            element.find('.links').css({
              height: 0
            });
            element.find('.expand').find('h4').text('click to expand')
          } else {
            element.find('.links').css({
              height: 200
            });        
            element.find('.expand').find('h4').text('click to collapse')
          }
          expanded = !expanded;
        };

        scope.upvote = function(){
          console.log('upvoted');
        };
      }
    };
  });