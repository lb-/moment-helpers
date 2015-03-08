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
      //TASK: tokens should be able to be a function also
      //Eg. 'dateOrTime': function (moDate) {//check if the date is just a date}
    }
  };

  self.configure = function (options) {
    _.extend(self.options, options);
  };

  self.log = function (log) {
    delete self.logged;
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
      Match.OneOf(Match.Where(moment.isMoment), Date, String)
    ));
    //goal is to get a moment object from what is provided
    if (moment.isMoment(obj)) {
      //if a moment is provided, return that moment, no questions asked
      return obj;
    } else if ( _.isDate(obj) ) {
      //if a date is provided, convert to moment and return
      return moment(obj);
    } else if ( _.isString(obj) ) {
      //attempt to get a date from the string
      var date = moment(obj);
      if (date.isValid()) { return date; }
    } else if (self.options.returnNowIfDateNotGiven) {
      self.log(self._msg.dateNotValidReturnNow);
      return moment();
    } else {
      self.log(self._msg.dateNotValidReturnNull);
      return null;
    }
  };

};

/* jshint ignore:start */
mo = new momentHelpers();
/* jshint ignore:end */
