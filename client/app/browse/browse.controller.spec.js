'use strict';

describe('Controller: BrowseCtrl', function () {

  // load the controller's module
  beforeEach(module('curatesApp'));

  var BrowseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrowseCtrl = $controller('BrowseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
