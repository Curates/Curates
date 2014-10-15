'use strict';

describe('Service: Votes', function () {

  // load the service's module
  beforeEach(module('curatesApp'));

  // instantiate service
  var votes;
  beforeEach(inject(function (_votes_) {
    votes = _votes_;
  }));

  it('should do something', function () {
    expect(!!votes).toBe(true);
  });

});
