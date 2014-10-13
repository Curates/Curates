'use strict';

angular.module('curatesApp')
  .directive('create', function () {
    return {
      templateUrl: 'app/create/create.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });