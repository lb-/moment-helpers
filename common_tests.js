"use strict";
var dateString = '2015-03-14 10:12:00';
var dateObject = new Date('2015-03-14 10:12:00');
var dateMoment = moment(dateObject);

Tinytest.add('Handlebar helpers - init session templates', function (test) {
  test.equal(Blaze.toHTML(Template.test_template_hi), "Hi");
});

Tinytest.add('debug configure default', function (test) {
  test.equal(mo.options.debug, false);
});

Tinytest.add('debug configure true', function (test) {
  mo.configure({debug:true});
  test.equal(mo.options.debug, true);
});
