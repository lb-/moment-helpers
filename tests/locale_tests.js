"use strict";

Tinytest.add('moment locale - testing', function (test) {
  moment.locale('fr', {
    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
      LT : "HH:mm",
      LTS : "HH:mm:ss",
      L : "DD/MM/YYYY",
      LL : "D MMMM YYYY",
      LLL : "D MMMM YYYY LT",
      LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
      sameDay: "[Aujourd'hui à] LT",
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L'
    },
    relativeTime : {
      future : "dans %s",
      past : "il y a %s",
      s : "quelques secondes",
      m : "une minute",
      mm : "%d minutes",
      h : "une heure",
      hh : "%d heures",
      d : "un jour",
      dd : "%d jours",
      M : "un mois",
      MM : "%d mois",
      y : "une année",
      yy : "%d années"
    },
    ordinalParse : /\d{1,2}(er|ème)/,
    ordinal : function (number) {
      return number + (number === 1 ? 'er' : 'ème');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
      return input.charAt(0) === 'M';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem : function (hours) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
  });

  //crete the dates AFTER the locale has been set
  // var dateString = '2015-03-14 10:12:00';
  var dateObject = new Date('2015-03-14 10:12:00');
  var dateMoment = moment(dateObject);

  //test the locale has worked
  test.equal(moment.locale(), 'fr');

  //test the locale formatting works
  test.equal(dateMoment.format('LLLL'), 'samedi 14 mars 2015 10:12');

  //test the moment helper setLocale function
  mo.setLocale('en');
  test.equal(moment.locale(), 'en');

});
