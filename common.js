"use strict";

var momentHelpers = function momentHelpers () {
  var self = this;

  //logging messages
  self._msg = {
    dateNotValidReturnNow:
      'valid date not provided, sending new moment instead',
    dateNotValidReturnNull:
      'valid date not provided, sending null'
  };

  //initate the default options
  self.options = {
    //if a helper is called and no date given, create one as now
    returnNowIfDateNotGiven: false,
    //extra console logging
    debug: false,
    //initial library of format tokens
    formatTokens: {
      'default': 'YYYY-MM-DD',
    }
  };

  //configuration function, merges the defaults with the options provided
  self.configure = function (options) {
    _.extend(self.options, options);
  };

  //logging function
  self.log = function (log) {

    //delete the currently stored log
    //this was enabled to assit with logging
    delete self.logged;

    //if debugging is enabled, log it!
    if (self.options.debug) {
      self.logged = log;
      console.log(log);
    }
  };

  //used for moFormat, helps to get a format token eg. 'YYYY-MM-DD'
  self._getToken = function getToken (token) {
    check(token, Match.Optional(String, null));
    var tokenLibrary = _.defaults(self.options.formatTokens, {
      //these tokens will always be available (unless overridden)
      'dayOfWeek': 'dddd',
      'dayOfMonth': 'D',
      'month': 'M',
      'year': 'YYYY',
      'time': 'h:mm a',
    });
    //if no token provided, use the default from the token library
    return tokenLibrary[token || 'default'] || token;
  };

  self._getMoment = function getMoment (obj) {
    check(obj, Match.Optional(
      Match.OneOf(Match.Where(moment.isMoment), Date, String, null)
    ));
    var result;
    //goal is to get a moment object from what is provided
    if (moment.isMoment(obj)) {
      //if a moment is provided, return that moment, no questions asked
      result = obj;
    } else if ( _.isDate(obj) ) {
      //if a date is provided, convert to moment and return
      result = moment(obj);
    } else if ( _.isString(obj) && (obj.length > 1) ) {
      //attempt to get a date from the string

      //if '|' is found, separate and use the RHS as the input format token
      if (obj.indexOf('|') !== -1) {
        var date = moment(
          obj.substring(0, obj.indexOf('|')), //input string LHS of '|'
          obj.substring(obj.indexOf('|') + 1) //input format, RHS after '|'
        );
      } else {
        var date = moment(new Date(obj));
      }
      if (date.isValid()) {
        result = date;
      }
    }

    //could not get a moment object
    //work out what to return if anything
    if (! result ) {
      if (self.options.returnNowIfDateNotGiven) {
        self.log(self._msg.dateNotValidReturnNow);
        return moment();
      } else {
        self.log(self._msg.dateNotValidReturnNull);
      }
    }

    return result;
  };

};

/* jshint ignore:start */
mo = new momentHelpers();
/* jshint ignore:end */
