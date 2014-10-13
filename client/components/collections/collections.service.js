'use strict';

angular.module('curatesApp')
  .factory('Collections', function ($http) {

    // Get list of collections
    var fetchAll = function() {
      return $http({
        method: 'GET',
        url: '/api/collections',
      })
      .success(function(data) {
        console.log(data);
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Get a single collection
    var fetchCollection = function(id) {
      return $http({
        method: 'GET',
        url: '/api/collections/' + id,
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Create a new collection
    var addCollection = function (collection) {
      return $http({
        method: 'POST',
        url: '/api/collections',
        data: collection
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Update an existing collection.
    // Add/Remove Links or Favorites
    var editCollection = function (collection) {
      return $http({
        method: 'PUT',
        url: '/api/collections/' + collection._id,
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
    var removeCollection = function (id) {
      return $http({
        method: 'DELETE',
        url: '/api/collections/' + id,
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    // Fetch all collections for a particular user
    var fetchUserCollections = function(id) {
      return $http({
        method: 'GET',
        url: '/api/collections/user/' + id,
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

    return {
      fetchAll: fetchAll,
      fetchUserCollections: fetchUserCollections,
      fetchCollection: fetchCollection,
      addCollection: addCollection,
      editCollection: editCollection,
      removeCollection: removeCollection
    };
  });
