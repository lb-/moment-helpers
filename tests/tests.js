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
    }), dateMoment.format('LLL')); //default format
    test.equal(Blaze.toHTMLWithData(Template.moFormatArgs, {
      formatToken: 'hh:mm a'
    }), '');
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      date: dateMoment,
    }), dateMoment.format('LLL')); //default format
    test.equal(Blaze.toHTMLWithData(Template.moFormatVars, {
      formatToken: 'dddd [the] Do [of] MMMM, YYYY'
    }), '');
  });

  Tinytest.add('moFormat - helper with empty strings & return now', function (test) {
    var fmt = 'dddd [the] Do [of] MMMM, YYYY';
    mo.configure({returnNowIfDateNotGiven: true});
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: '', formatToken: fmt}),
      moment().format(fmt)
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: 'null', formatToken: fmt}),
      moment().format(fmt)
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: 'undefined', formatToken: fmt}),
      moment().format(fmt)
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: null, formatToken: fmt}),
      moment().format(fmt)
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: undefined, formatToken: fmt}),
      moment().format(fmt)
    );
    //error could cause this
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: '|', formatToken: fmt}),
      moment().format(fmt)
    );
    mo.configure({returnNowIfDateNotGiven: false});
  });

  Tinytest.add('moFormat - helper with empty strings & return null', function (test) {
    mo.configure({returnNowIfDateNotGiven: false});
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: ''}),
      ''
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: 'null'}),
      ''
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: 'undefined'}),
      ''
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: null}),
      ''
    );
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: undefined}),
      ''
    );
    //error could cause this
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatVars, {date: '|'}),
      ''
    );
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


  Tinytest.add('moFrom - mix of everything as args', function (test) {

    mo.configure({
      returnNowIfDateNotGiven: true,
    });

    test.equal(Blaze.toHTMLWithData(Template.moFromArgs, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
    }), 'in 4 months');

    test.equal(Blaze.toHTMLWithData(Template.moFromArgs, {
      dateA: dateMoment,
      dateB: dateMomentAfter,
    }), '4 months ago');

  });

  Tinytest.add('moFrom - mix of everything as vars', function (test) {

    mo.configure({
      returnNowIfDateNotGiven: true,
    });

    test.equal(Blaze.toHTMLWithData(Template.moFromVars, {
      dateA: dateMomentAfter,
      dateB: dateMoment,
    }), 'in 4 months');

    test.equal(Blaze.toHTMLWithData(Template.moFromVars, {
      dateA: dateMoment,
      dateB: dateMomentAfter,
    }), '4 months ago');

    test.equal(Blaze.toHTMLWithData(Template.moFromVars, {
      dateA: null,
      dateB: dateMoment,
    }), moment().from(dateMoment) )

    test.equal(Blaze.toHTMLWithData(Template.moFromVars, {
      // dateA: dateMoment,
      dateB: dateMoment,
    }), moment().from(dateMoment) )

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

  Tinytest.add('date parsing - providing dates as string with format', function (test) {
    var fmt = 'YYYYMMDD';
    var str = '20150105';
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatArgs, {
        date: str + '|' + fmt
      }),
      moment(str, fmt).format(mo.options.formatTokens.default)
    );

    var fmt = 'YYYYDDD-HHmm';
    var str = '2015332-1732';
    test.equal(
      Blaze.toHTMLWithData(Template.moFormatArgs, {
        date: str + '|' + fmt
      }),
      moment(str, fmt).format(mo.options.formatTokens.default)
    );

  });

  Tinytest.add('formatToken library - function via formatToken', function (test) {

    //this enables you to make the formatToken a result of a function
    //this (inside the function) should be the moment object
    mo.configure({
      formatTokens: {
        'smartDate': function () {
          if (this.format('HHmm') === '0000') {
            return 'dddd'; //if no time, assume date and return day like 'Sunday'
          }
          // if has time, assume date AND time and return like Sunday 1400
          return 'dddd h:mma';
        }
      }
    });

    var dateWithTime = moment('2015-08-15 09:22', 'YYYY-MM-DD HH:mm');

    var dateWithoutTime = moment('2015-08-15', 'YYYY-MM-DD');

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs, {date: dateWithoutTime, formatToken: 'smartDate'}
      ),
      'Saturday'
    );

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs, {date: dateWithTime, formatToken: 'smartDate'}
      ),
      'Saturday 9:22am'
    );

    //make a formatToken function that returns 'Game Day!' if it is a Friday
    var isGameDay = moment('2015-08-14', 'YYYY-MM-DD');
    var isNotGameDayA = moment('2015-08-16', 'YYYY-MM-DD');
    var isNotGameDayB = moment('2015-09-22', 'YYYY-MM-DD');

    mo.configure({
      formatTokens: {
        'gameDay': function () {
          if (this.format('dddd') === 'Friday') {
            //if Friday, return this
            return '[Game Day!]';
          }
          //otherwise return just a day with a countdown
          var nextFriday = moment(this).day(5);
          var daysUntilFriday = nextFriday.diff(this, 'days');
          return 'dddd ' + '[' + daysUntilFriday + ' days until Game Day]';
        }
      }
    });

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs,
        {date: isGameDay, formatToken: 'gameDay'}
      ), 'Game Day!'
    );

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs,
        {date: isNotGameDayA, formatToken: 'gameDay'}
      ), 'Sunday 5 days until Game Day'
    );

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs,
        {date: isNotGameDayB, formatToken: 'gameDay'}
      ), 'Tuesday 3 days until Game Day'
    );


  });


  Tinytest.add('formatToken library - add to library', function (test) {

    mo.configure({
      formatTokens: {
        'quickDate': 'D MMM',
        'notSoQuickDate': 'dddd Do MMMM YYYY',
      }
    });

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs,
        {date: dateMoment, formatToken: 'quickDate'}
      ), '14 Mar'
    );

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs,
        {date: dateMoment, formatToken: 'notSoQuickDate'}
      ), 'Saturday 14th March 2015'
    );

  });

  Tinytest.add('formatToken library - overwrite built in library', function (test) {

    mo.configure({
      formatTokens: {
        'dayOfWeek': 'dd',
        'time': 'HH:MM',
      }
    });

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs,
        {date: dateMoment, formatToken: 'dayOfWeek'}
      ), 'Sa'
    );

    test.equal(
      Blaze.toHTMLWithData(
        Template.moFormatArgs,
        {date: dateMoment, formatToken: 'time'}
      ), '10:03'
    );

  });
}
