'use strict';

describe('Controller: UsercollectionsCtrl', function () {

  // load the controller's module
  beforeEach(module('curatesApp'));

  var UsercollectionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsercollectionsCtrl = $controller('UsercollectionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
