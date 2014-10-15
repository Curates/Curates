'use strict';

angular.module('curatesApp')
  .factory('Votes', function ($http) {

    var addVote = function(vote) {
      return $http({
        method: 'POST',
        url: '/api/votes',
        data: vote
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    return {
      addVote: addVote
    };
  });
