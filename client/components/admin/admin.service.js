'use strict';

angular.module('curatesApp')
  .factory('Admin', function ($http) {

    // Get the list of users
    var fetchUsers = function() {
      return $http({
        method: 'GET',
        url: '/api/users',
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Delete a user
    var removeUser = function (id) {
      return $http({
        method: 'DELETE',
        url: '/api/users/' + id,
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    return {
      fetchUsers: fetchUsers,
      removeUser: removeUser
    };
  });
