'use strict';

describe('Service: Admin', function () {

  // load the service's module
  beforeEach(module('curatesApp'));

  // instantiate service
  var Admin;
  beforeEach(inject(function (_Admin_) {
    Admin = _Admin_;
  }));

  it('should do something', function () {
    expect(!!Admin).toBe(true);
  });

});
