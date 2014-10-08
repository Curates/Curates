'use strict';

describe('Service: Collections', function () {

  // load the service's module
  beforeEach(module('curatesApp'));

  // instantiate service
  var collections;
  beforeEach(inject(function (_collections_) {
    collections = _collections_;
  }));

  it('should do something', function () {
    expect(!!collections).toBe(true);
  });

});
