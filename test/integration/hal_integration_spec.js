'use strict';

var HyRes = require('../../index');

require('es6-promise').polyfill();

var chai = require('chai');
chai.use(require('chai-hy-res'));
var expect = chai.expect;
var axios = require('axios');

describe('HyRes + axios to consume HALTalk', function() {
  this.timeout(30000);
  var root;

  beforeEach(function() {
    var rootLink = new HyRes.Root(this.apiUrl, axios, [new HyRes.HalExtension()]);

    root = rootLink.follow();
    return root.$promise;
  });

  it('is resolved', function() {
    expect(root.$resolved).to.be.true;
  });

  it('has a self link', function() {
    expect(root).to.have.link('self');
  });

  describe('following a templated link relation', function() {
    var thing;
    var id = '123';

    beforeEach(function() {
      thing = root.$followOne('thing-template', { data: { id: id } });
      return thing.$promise;
    });

    it('is resolved', function() {
      expect(thing.$resolved).to.be.true;
    });

    it('has a self link', function() {
      expect(thing).to.have.link('self');
    });
  });
});
