'use strict';

angular.module('curatesApp')
  .filter('orderObjectBy', function(){ 
    return function(input, attribute, direction) { 
      if (!angular.isObject(input)) 
        return input; var array = []; 
      for(var objectKey in input) { 
        array.push(input[objectKey]); 
      } 
      array.sort(function(a, b){ a = parseInt(a[attribute]); 
      b = parseInt(b[attribute]); 
      return direction == 'asc' ? a - b : b - a; }); 
    return array; } 
  });