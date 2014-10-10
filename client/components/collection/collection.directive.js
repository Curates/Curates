'use strict';

angular.module('curatesApp')
  .directive('collection', function () {
    return {
      templateUrl: 'components/collection/collection.html',
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });