'use strict';

angular.module('curatesApp')
  .factory('Favorites', function (User) {

    // Get list of favorites
    var fetchAll = function() {
      return $http({
        method: 'GET',
        url: '/api/favorites',
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Create a new
    var addFavorite = function (collection) {
      return $http({
        method: 'POST',
        url: '/api/favorites',
        data: collection
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Delete a collection
    var removeFavorite = function (id) {
      return $http({
        method: 'DELETE',
        url: '/api/favorites/' + id,
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Fetch all favorites for a particular user
    var fetchUserFavorites = function(id) {
      return $http({
        method: 'GET',
        url: '/api/favorites/user/' + id,
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    return {
      fetchUserFavorites: fetchUserFavorites,
      addFavorite: addFavorite,
      removeFavorite: removeFavorite
    };
  });


