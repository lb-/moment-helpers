Template.registerHelper( 'moFormat', function () {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line

  // enables the arguments to be provided as args or vars
  // eg. {{moFormat date=myDate}} or {{moFormat myDate}} will do the same thing
  let args = Array.from( arguments );
  const kw = args.pop();
  const date = args[0] || kw.hash.d;
  const formatToken = args[1] || kw.hash.f;

  // processes what was given to ensure we end up with a moment object
  const moDate = mo._getMoment( date );

  // fail silently if the date is not worked out to be a moment
  if ( moDate ) {
    return moDate.format( mo._getToken( formatToken, moDate ) );
  }

  return;
});

Template.registerHelper( 'moDiff', function () {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line
  let result;

  // enables the arguments to be provided as args or vars
  let args = Array.from( arguments );
  const kw = args.pop();
  const dateA = mo._getMoment( args[0] || kw.hash.a );
  const dateB = mo._getMoment( args[1] || kw.hash.b );
  const units = args[2] || kw.hash.units || 'seconds';
  let returnFloat = args[3] || kw.hash.returnFloat;

  // if the returnFloat is truthy convert it to true, or falsy = false
  if ( returnFloat ) {
    returnFloat = true;
  } else {
    returnFloat = false;
  }

  // if the two dates are valid moment objects, send the result
  if ( dateA && dateB ) {
    result = dateA.diff( dateB, units, returnFloat );
  }

  // fail silently if the dates were not processed to a moment
  return result;
});

Template.registerHelper( 'moFrom', function () {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line
  var result;

  // enables the arguments to be provided as args or vars
  let args = Array.from( arguments );
  const kw = args.pop();
  const dateA = mo._getMoment( args[0] || kw.hash.a );
  const dateB = mo._getMoment( args[1] || kw.hash.b );

  // if the two dates are valid moment objects, send the result
  if ( dateA && dateB ) {
    result = dateA.from( dateB );
  }

  // fail silently if the dates were not processed to a moment
  return result;
});

Template.registerHelper( 'moFromNow', function () {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line

  // enables the arguments to be provided as args or vars
  let args = _.toArray( arguments );
  const kw = args.pop();
  const date = args[0] || kw.hash.d;
  let withoutSuffix = args[1] || kw.hash.withoutSuffix;

  // if the withoutSuffix is truthy convert it to true, or falsy = false
  if ( withoutSuffix ) {
    withoutSuffix = true;
  } else {
    withoutSuffix = false;
  }

  // work with what is given to get a moment object
  const moDate = mo._getMoment( date );

  // if we did end up with a valid object above, send the result
  if ( moDate ) {
    return moDate.fromNow( withoutSuffix );
  }

  // fail silently if the dates were not processed to a moment
  return;
});

Template.registerHelper( 'moCalendar', function () {
  // Calling this reactive property ensure the helper is updated
  const locale = mo.currentLocale.get(); // eslint-disable-line

  // enables the arguments to be provided as args or vars
  // eg. {{moFormat date=myDate}} or {{moFormat myDate}} will do the same thing
  let args = Array.from( arguments );
  const kw = args.pop();
  const date = args[0] || kw.hash.d;
  const referenceDate = args[1] || kw.hash.r;
  let moReferenceDate;

  // processes what was given to ensure we end up with a moment object
  const moDate = mo._getMoment( date );

  // never let reference date default to now if not provided
  if ( referenceDate ) {
    moReferenceDate = mo._getMoment( referenceDate );
  }

  // fail silently if the date is not worked out to be a moment
  if ( moDate ) {
    if ( moReferenceDate ) {
      return moDate.calendar( moReferenceDate );
    } else {
      return moDate.calendar();
    }
  }

  return;
});

Template.registerHelper( 'moNow', function () {
  const now = mo.now.get();
  
  return now;
});
