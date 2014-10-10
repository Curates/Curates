'use strict';

describe('Controller: CollectionsCtrl', function () {

  // load the controller's module
  beforeEach(module('curatesApp'));

  var CollectionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CollectionsCtrl = $controller('CollectionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
