'use strict';

angular.module('curatesApp')
  .factory('Collections', function ($http) {

    var fetchAll = function() {
      return $http({
        method: 'GET',
        url: '/api/collections',
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

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

    var editCollection = function (collection) {
      return $http({
        method: 'PUT',
        url: '/api/collections/' + collection.id,
        data: collection
      })
      .success(function(data) {
        return data;
      })
      .error(function(data) {
        throw new Error(data);
      });
    };

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

    return {
      fetchAll: fetchAll,
      fetchUserCollections: fetchUserCollections,
      fetchCollection: fetchCollection,
      addCollection: addCollection,
      editCollection: editCollection,
      removeCollection: removeCollection
    };
  });
