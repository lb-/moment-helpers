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

  //enables the arguments to be provided as args or vars
  //eg. {{moFormat date=myDate}} or {{moFormat myDate}} will do the same thing
  var args = _.toArray(arguments);
  var kw = args.pop();
  var date = args[0] || kw.hash.d;
  var formatToken = args[1] || kw.hash.f;

  //processes what was given to ensure we end up with a moment object
  var moDate = mo._getMoment(date);

  // fail silently if the date is not worked out to be a moment
  if (moDate) {
    return moDate.format(mo._getToken(formatToken, moDate));
  }

  return;
});

Template.registerHelper('moDiff', function () {
  // Calling this reactive property ensure the helper is updated whenever the
  // moment.locale change
  var locale = currentLocale.get();
  var result;

  //enables the arguments to be provided as args or vars
  var args = _.toArray(arguments);
  var kw = args.pop();
  var dateA = mo._getMoment(args[0] || kw.hash.a);
  var dateB = mo._getMoment(args[1] || kw.hash.b);
  var units = args[2] || kw.hash.units || 'seconds';
  var returnFloat = args[3] || kw.hash.returnFloat;

  //if the returnFloat is truthy convert it to true, or falsy = false
  if (returnFloat) { returnFloat = true; } else { returnFloat = false; }

  //if the two dates are valid moment objects, send the result
  if (dateA && dateB) { result = dateA.diff(dateB, units, returnFloat); }

  // fail silently if the dates were not processed to a moment
  return result;
});

Template.registerHelper('moFromNow', function () {
  // Calling this reactive property ensure the helper is updated whenever the
  // moment.locale change
  var locale = currentLocale.get();

  //enables the arguments to be provided as args or vars
  var args = _.toArray(arguments);
  var kw = args.pop();
  var date = args[0] || kw.hash.d;
  var withoutSuffix = args[1] || kw.hash.withoutSuffix;

  //if the withoutSuffix is truthy convert it to true, or falsy = false
  if (withoutSuffix) { withoutSuffix = true; } else { withoutSuffix = false; }

  //work with what is given to get a moment object
  var moDate = mo._getMoment(date);

  //if we did end up with a valid object above, send the result
  if (moDate) { return moDate.fromNow(withoutSuffix); }

  // fail silently if the dates were not processed to a moment
  return;
});
