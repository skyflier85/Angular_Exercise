'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

  describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones');
    });


    it('should filter the phone list as a user types into the search box', function() {

      var phoneList = element.all(by.repeater('phone in phones'));
      var query = element(by.model('query'));

      expect(phoneList.count()).toBe(3);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(2);
    });

    it('should render phone specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element.all(by.css('.phones li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toBe('/phones/nexus-s');
      });
    });

    it('should redirect index.html to index.html#/phones', function() {
		browser.get('app/index.html');
		browser.getLocationAbsUrl().then(function(url) {
	    	expect(url).toEqual('/phones');
	  	});
	});

  });

  describe('Phone detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones/nexus-s');
    });

    it('should display placeholder page with phoneId', function() {
      expect(element(by.binding('phoneId')).getText()).toBe('nexus-s');
    });

    it('should display nexus-s page', function() {
      expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
    });
  });

});