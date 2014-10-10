'use strict';

angular.module('curatesApp')
  .directive('search', function () {
    return {
      templateUrl: 'app/search/search.directive.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });