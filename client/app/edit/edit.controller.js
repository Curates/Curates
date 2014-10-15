'use strict';

angular.module('curatesApp')
  .controller('EditCtrl', function ($scope, Collections) {
    $scope.message = 'Hello';

    var collection = $scope.collection = {
      id: 1,
      title: 'Collection title',
      description: 'Collection description here.',
      links:  [
        {
          title: 'the link tutle',
          description: 'some description here',
          url: 'http://asdasdasdasd.com'
        },  
            {
          title: 'the link tutle',
          description: 'some description here',
          url: 'http://asdasdasdasd.com'
        },
            {
          title: 'the link tutle',
          description: 'some description here',
          url: 'http://asdasdasdasd.com'
        }
      ]
    };

    
    $scope.save = function () {
      Collections.editCollection(collection);
    };

  });
