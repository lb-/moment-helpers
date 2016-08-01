class MomentHelper {

  constructor(...args) {
    this.args = args;

    // Calling this reactive property ensure the helper is updated
    this.locale = mo.currentLocale.get();

    // eg. {{moFormat date=myDate}} / {{moFormat myDate}} will do the same thing
    this.keywords = args.pop();
    this.dateA = args[0] || this.keywords.hash.d || this.keywords.hash.a;

    // processes what was given to ensure we end up with a moment object
    this.moDate = mo._getMoment(this.dateA);
  }

  moFormat() {
    if (this.moDate) {
      this.formatToken = this.args[1] || this.keywords.hash.f;

      return this.moDate.format(
        mo._getToken(this.formatToken, this.moDate)
      );
    }
    // fail silently if the date is not worked out to be a moment
    return null;
  }

}

Template.registerHelper('moFormat', (...args) =>
  new MomentHelper(...args).moFormat()
);

Template.registerHelper('moDiff', function moDiff(...args) {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line
  let result;

  // enables the arguments to be provided as args or vars
  const kw = args.pop();
  const dateA = mo._getMoment(args[0] || kw.hash.a);
  const dateB = mo._getMoment(args[1] || kw.hash.b);
  const units = args[2] || kw.hash.units || 'seconds';
  let returnFloat = args[3] || kw.hash.returnFloat;

  // if the returnFloat is truthy convert it to true, or falsy = false
  if (returnFloat) {
    returnFloat = true;
  } else {
    returnFloat = false;
  }

  // if the two dates are valid moment objects, send the result
  if (dateA && dateB) {
    result = dateA.diff(dateB, units, returnFloat);
  }

  // fail silently if the dates were not processed to a moment
  return result;
});

Template.registerHelper('moFrom', function moFrom(...args) {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line
  let result;

  const kw = args.pop();
  const dateA = mo._getMoment(args[0] || kw.hash.a);
  const dateB = mo._getMoment(args[1] || kw.hash.b);
  let withoutSuffix = args[2] || kw.hash.withoutSuffix;

  // if the withoutSuffix is truthy convert it to true, or falsy = false
  if (withoutSuffix) {
    withoutSuffix = true;
  } else {
    withoutSuffix = false;
  }

  // if the two dates are valid moment objects, send the result
  if (dateA && dateB) {
    result = dateA.from(dateB, withoutSuffix);
  }

  // fail silently if the dates were not processed to a moment
  return result;
});

Template.registerHelper('moFromNow', function moFromNow(...args) {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line

  // enables the arguments to be provided as args or vars
  const kw = args.pop();
  const date = args[0] || kw.hash.d;
  let withoutSuffix = args[1] || kw.hash.withoutSuffix;

  // if the withoutSuffix is truthy convert it to true, or falsy = false
  if (withoutSuffix) {
    withoutSuffix = true;
  } else {
    withoutSuffix = false;
  }

  // work with what is given to get a moment object
  const moDate = mo._getMoment(date);

  // if we did end up with a valid object above, send the result
  if (moDate) {
    return moDate.fromNow(withoutSuffix);
  }

  // fail silently if the dates were not processed to a moment
  return null;
});

Template.registerHelper('moCalendar', function moCalendar(...args) {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line

  // enables the arguments to be provided as args or vars
  // eg. {{moFormat date=myDate}} or {{moFormat myDate}} will do the same thing
  const kw = args.pop();
  const date = args[0] || kw.hash.d;
  const referenceDate = args[1] || kw.hash.r;
  let moReferenceDate;

  // processes what was given to ensure we end up with a moment object
  const moDate = mo._getMoment(date);

  // never let reference date default to now if not provided
  if (referenceDate) {
    moReferenceDate = mo._getMoment(referenceDate);
  }

  // fail silently if the date is not worked out to be a moment
  if (moDate) {
    if (moReferenceDate) {
      return moDate.calendar(moReferenceDate);
    }
    return moDate.calendar();
  }

  return null;
});

Template.registerHelper('moNow', () => mo.now.get());
