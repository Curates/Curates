'use strict';

describe('Directive: collection', function () {

  // load the directive's module and view
  beforeEach(module('curatesApp'));
  beforeEach(module('components/collection/collection.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<collection></collection>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the collection directive');
  }));
});