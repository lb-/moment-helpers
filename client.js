"use strict";

var currentLocale = new ReactiveVar();
currentLocale.set(moment.locale());

var originalLocale = moment.locale;

moment.locale = function(key, values){
  var locale = originalLocale(key, values);

  if (key) {
    if (typeof(values) === 'undefined') {
      currentLocale.set(locale);
    }
  }

  return locale;
}

Template.registerHelper('moFormat', function () {
  // Calling this reactive property ensure the helper is updated whenever the
  // moment.locale change
  var locale = currentLocale.get();

  var args = _.toArray(arguments);
  var kw = args.pop();
  var date = args[0] || kw.hash.d;
  var formatToken = args[1] || kw.hash.f;
  var moDate = mo._getMoment(date);
  if (moDate) {
    return moDate.format(mo._getToken(formatToken));
  }
  return;
});

Template.registerHelper('moDiff', function () {
  // Calling this reactive property ensure the helper is updated whenever the
  // moment.locale change
  var locale = currentLocale.get();

  var result;
  var args = _.toArray(arguments);
  var kw = args.pop();
  var dateA = mo._getMoment(args[0] || kw.hash.a);
  var dateB = mo._getMoment(args[1] || kw.hash.b);
  var units = args[2] || kw.hash.units || 'seconds';
  var returnFloat = args[3] || kw.hash.returnFloat;
  if (returnFloat) { returnFloat = true; } else { returnFloat = false; }
  if (dateA && dateB) { result = dateA.diff(dateB, units, returnFloat); }
  return result;
});

Template.registerHelper('moFromNow', function () {
  // Calling this reactive property ensure the helper is updated whenever the
  // moment.locale change
  var locale = currentLocale.get();

  var args = _.toArray(arguments);
  var kw = args.pop();
  var date = args[0] || kw.hash.d;
  var withoutSuffix = args[1] || kw.hash.withoutSuffix;
  if (withoutSuffix) { withoutSuffix = true; } else { withoutSuffix = false; }
  var moDate = mo._getMoment(date);
  if (moDate) { return moDate.fromNow(withoutSuffix); }
  return;
});
