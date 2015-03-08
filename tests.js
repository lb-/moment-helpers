"use strict";
var dateString = '2015-03-14 10:12:00';
var dateObject = new Date('2015-03-14 10:12:00');
var dateMoment = moment(dateObject);

var dateStringAfter = '2015-07-22 15:19:22';
var dateObjectAfter = new Date(dateStringAfter);
var dateMomentAfter = moment(dateObjectAfter);

//helpers tests
if (Meteor.isClient) {

  Tinytest.add('helpers - init templates', function (test) {
    test.equal(Blaze.toHTML(Template.testTemplateInit), 'test');
  });

  Tinytest.add('moFormat - helper with all variables', function (test) {
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      date: dateMoment,
      formatToken: 'YYYY-MM-DD Dd Mo'
    }), '2015-03-14 146 3rd');
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      date: dateMoment,
      formatToken: 'hh:mm a'
    }), '10:12 am');
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      date: dateMoment,
      formatToken: '[Quarter] Q, Wo [week]'
    }), 'Quarter 1, 11th week');
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      date: dateMoment,
      formatToken: 'dddd [the] Do [of] MMMM, YYYY'
    }), 'Saturday the 14th of March, 2015');
  });

  Tinytest.add('moFormat - different date vars provided', function (test) {
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      date: dateObject,
      formatToken: 'YYYY-MM-DD Dd Mo'
    }), '2015-03-14 146 3rd');
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      date: dateString,
      formatToken: 'hh:mm a'
    }), '10:12 am');
  });

  Tinytest.add('moFormat - helper with missing variables', function (test) {
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      date: dateMoment,
    }), '2015-03-14'); //default format
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      formatToken: 'hh:mm a'
    }), '');
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      date: dateMoment,
    }), '2015-03-14'); //default format
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      formatToken: 'dddd [the] Do [of] MMMM, YYYY'
    }), '');
  });

  Tinytest.add('moFormat - missing vars + defaults changed', function (test) {
    mo.configure({
      returnNowIfDateNotGiven: true,
      formatTokens: {
        'default': 'dddd [the] Do [of] MMMM, YYYY',
      }
    });
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      date: dateMoment,
    }), 'Saturday the 14th of March, 2015');
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      formatToken: 'YYYY'
    }), moment().format('YYYY'));
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      date: dateMoment,
    }), 'Saturday the 14th of March, 2015');
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      formatToken: 'MMM, YYYY'
    }), moment().format('MMM, YYYY'));
    mo.configure({returnNowIfDateNotGiven: false});
  });

  Tinytest.add('moFromNow - with all variables', function (test) {

    test.equal(Blaze.toHTMLWithData(Template.moFromNowArgs, {
      date: dateMoment,
      withoutSuffix: true,
    }), dateMoment.fromNow(true));
    test.equal(Blaze.toHTMLWithData(Template.moFromNowArgs, {
      date: dateMoment,
      withoutSuffix: false,
    }), dateMoment.fromNow(false));

    test.equal(Blaze.toHTMLWithData(Template.moFromNowVars, {
      date: dateMoment,
      withoutSuffix: true,
    }), dateMoment.fromNow(true));
    test.equal(Blaze.toHTMLWithData(Template.moFromNowVars, {
      date: dateMoment,
      withoutSuffix: false,
    }), dateMoment.fromNow(false));

  });

  Tinytest.add('moFromNow - different date types provided', function (test) {

    test.equal(Blaze.toHTMLWithData(Template.moFromNowArgs, {
      date: dateString,
      withoutSuffix: true,
    }), dateMoment.fromNow(true));

    test.equal(Blaze.toHTMLWithData(Template.moFromNowArgs, {
      date: dateObject,
      withoutSuffix: false,
    }), dateMoment.fromNow(false));

    test.equal(Blaze.toHTMLWithData(Template.moFromNowVars, {
      date: dateString,
    }), dateMoment.fromNow());

  });


  Tinytest.add('moDiff - mix of everything as args', function (test) {

    test.equal(Blaze.toHTMLWithData(Template.moDiffArgs, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      units: 'days',
      //returnFloat: false
    }), '130');

    test.equal(Blaze.toHTMLWithData(Template.moDiffArgs, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      units: 'months',
      //returnFloat: false
    }), '4');

    test.equal(Blaze.toHTMLWithData(Template.moDiffArgs, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      //units: 'days', // defaults to seconds
      returnFloat: true
    }), '11250442');

    test.matches(Blaze.toHTMLWithData(Template.moDiffArgs, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      units: 'months',
      returnFloat: true
    }), /(4\.2)[0-9]*/);

  });

  Tinytest.add('moDiff - mix of everything as vars', function (test) {

    test.equal(Blaze.toHTMLWithData(Template.moDiffVars, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      units: 'days',
      //returnFloat: false
    }), '130');

    test.equal(Blaze.toHTMLWithData(Template.moDiffVars, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      units: 'months',
      //returnFloat: false
    }), '4');

    test.equal(Blaze.toHTMLWithData(Template.moDiffVars, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      //units: 'days', // defaults to seconds
      returnFloat: true
    }), '11250442');

    test.matches(Blaze.toHTMLWithData(Template.moDiffVars, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
      units: 'months',
      returnFloat: true
    }), /(4\.2)[0-9]*/);

  });

  Tinytest.add('debug - configuration', function (test) {
    mo.configure({debug:true});
    test.equal(mo.options.debug, true);
    mo.configure({debug:false});
  });

  Tinytest.add('debug - logging enabled test', function (test) {
    mo.configure({debug:true});
    mo.log('test');
    test.equal(mo.logged,'test');
    mo.configure({debug:false});
  });

  Tinytest.add('debug - logging disabled test', function (test) {
    mo.configure({debug:false});
    mo.log('test');
    test.isUndefined(mo.logged);
  });

  Tinytest.add('debug - log if returning date', function (test) {
    mo.configure({
      debug: true,
      returnNowIfDateNotGiven: true
    });

    test.equal(
      Blaze.toHTMLWithData(Template.moFormatArgs, {}),
      moment().format(mo.options.formatTokens.default)
    );
    test.equal(mo.logged, mo._msg.dateNotValidReturnNow);

    mo.configure({debug:false});
  });

  Tinytest.add('debug - log if returning null', function (test) {
    mo.configure({
      debug: true,
      returnNowIfDateNotGiven: false
    });

    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {}), '');
    test.equal(mo.logged, mo._msg.dateNotValidReturnNull);

    mo.configure({debug:false});
  });

}
