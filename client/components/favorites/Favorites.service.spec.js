'use strict';

describe('Service: Favorites', function () {

  // load the service's module
  beforeEach(module('curatesApp'));

  // instantiate service
  var Favorites;
  beforeEach(inject(function (_Favorites_) {
    Favorites = _Favorites_;
  }));

  it('should do something', function () {
    expect(!!Favorites).toBe(true);
  });

});
