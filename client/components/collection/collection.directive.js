'use strict';

angular.module('curatesApp')
  .directive('collection', function (Favorites, Collections) {
    return {
      templateUrl: 'components/collection/collection.html',
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function (scope, element, attrs) {
        var expanded = false;
        
        scope.favorite = Favorites.addToFavorites

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