const moment = require('moment');

class MomentHelperInit {
  // let self = this;

  //
  constructor ( isClient ) {

    if ( isClient ) {
      // create a new reactiveVar that holds the moment helper context of locale
      this.currentLocale = new ReactiveVar();

      // when creating the moment helper context, set the locale same as moment
      this.currentLocale.set( moment.locale() );

      // reactive now
      this.now = new ReactiveVar( moment() );
      var now = this.now;

      Meteor.setInterval( function () {
        now.set( moment() );
      }, 1000 ); // every second
    }

    // logging messages
    this._msg = {
      dateNotValidReturnNow:
        'valid date not provided, sending new moment instead',
      dateNotValidReturnNull:
        'valid date not provided, sending null'
    };

    // initate the default options
    this.options = {
      // if a helper is called and no date given, create one as now
      returnNowIfDateNotGiven: false,
      // extra console logging
      debug: false,
      // initial library of format tokens
      formatTokens: {
        'default': 'LLL'
        // defaults to locale date format: Month name, day of month, year, time
      }
    };

  }


  // configuration function, merges the defaults with the options provided
  configure ( options ) {
    _.extend( this.options, options );
  }

  // expose a utility to set the locale, updating moment & reactive locale
  setLocale ( locale ) {
    moment.locale( locale );
    this.currentLocale.set( moment.locale() );// how does 'this' work?
  }

  // logging function
  log ( log ) {

    // delete the currently stored log
    // this was enabled to assit with logging
    delete this.logged;

    // if debugging is enabled, log it!
    if ( this.options.debug ) {
      this.logged = log;
      console.log( log );
    }
  }

  // used for moFormat, helps to get a format token eg. 'YYYY-MM-DD'
  _getToken ( token, aMoment ) {
    check( token, Match.Optional( String, null ) );
    let tokenLibrary = _.defaults( this.options.formatTokens, {
      // these tokens will always be available (unless overridden)
      'dayOfWeek': 'dddd',
      'dayOfMonth': 'D',
      'month': 'M',
      'year': 'YYYY',
      'time': 'h:mm a'
    });

    // if no token provided, use the default from the token library
    if ( !token ) {
      token = 'default';
    }

    // see if the token is a reference to the token library, otherwise keep
    token = tokenLibrary[token] || token;

    // check if token is a function & process
    if ( _.isFunction( token ) ) {
      token = token.call( aMoment );
    }

    // return the token
    return token;
  }

  _getMoment ( obj ) {
    
    var result;
    var date;

    // goal is to get a moment object from what is provided
    if ( moment.isMoment( obj ) ) {
      // if a moment is provided, return that moment, no questions asked
        result = obj;
    } else if ( _.isDate( obj ) ) {
      // if a date is provided, convert to moment and return
      result = moment( obj );
    } else if ( _.isString( obj ) && obj.length > 1 ) {
      // attempt to get a date from the string

      // if '|' is found, separate and use the RHS as the input format token
      if ( obj.indexOf( '|' ) !== -1 ) {
        date = moment(
          obj.substring( 0, obj.indexOf( '|' ) ), // input string LHS of '|'
          obj.substring( obj.indexOf( '|' ) + 1 ) // input format, RHS after '|'
        );
      } else {
        date = moment( new Date( obj ) );
      }
      if ( date.isValid() ) {
        result = date;
      }
    }

    // could not get a moment object, work out what to return if anything
    if ( !result ) {
      // lets support epoch as inbound date type
      if(typeof obj === 'number'){
        return moment.unix(obj);
      }

      if ( this.options.returnNowIfDateNotGiven ) {
        this.log( this._msg.dateNotValidReturnNow );
        return moment();
      } else {
        this.log( this._msg.dateNotValidReturnNull );
      }
    }

    return result;
  }

}

mo = new MomentHelperInit( Meteor.isClient );
