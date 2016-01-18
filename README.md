# Moment Helpers

A set of helpers that closely follows the [Moment.js](http://momentjs.com/) api giving you easy access to formatting and other utilities.

Implemented helpers:
* `{{moFormat someDate 'YYYY-MM-DD'}}` is like `moment().format('YYYY-MM-DD');`
* `{{moFromNow someDate withoutSuffix}}` is like `moment().fromNow(Boolean);`
* `{{moFrom dateA dateB withoutSuffix}}` is like `moment().from(Moment, Boolean);`
* `{{moDiff dateA dateB units returnFloat}}` is like `moment().diff(Moment, String, Boolean);`
* `{{moCalendar date referenceDate}}` is like `moment().calendar(referenceTime);`


## Installation

```bash
  meteor add lbee:moment-helpers
```

## Reactivity
In order to get reactive helpers modifying the results according to current locale, you must use `mo.setLocale` instead of `moment.locale` whenever you want to change locale dynamically. This will be available on the client only.

## Examples

## moNow
moNow will return a reactive current moment, updated every second, it can be passed to moFormat (or any other helper) or be used on its own

```html
  <template name='myClock'>
    <h1>Current Time
      <small>{{moFormat moNow 'HH:mm:ss'}}</small>
    </h1>
  </template>
```

You can also use this reactive variable anywhere on the client via `mo.now.get()`


### moFormat
http://momentjs.com/docs/#/displaying/format/

You can either use variables passed to the helper or keyword arguments:
* `{{moFormat date formatToken}}`
* `{{moFormat d=date f=formatToken}}`

__date__ can be a Javascript Date, moment object or date string (see below for more information about date strings).

__formatToken__ can be any format token valid in Moment.js
http://momentjs.com/docs/#/displaying/format/
or can be a shortcut provided to config or using some of the built in ones
 * `'dayOfWeek': 'dddd'`
 * `'dayOfMonth': 'D'`
 * `'month': 'M'`
 * `'year': 'YYYY'`
 * `'time': 'h:mm a'`


```js
  Template.myTemplate.helpers({
    'startDate': function () {
      return moment('2015-01-01 12:13:14', 'YYYY-MM-DD hh:mm:ss');
    }
  });
```

```html
  <template name='myTemplate'>
    <h1>Super Title
      <small>{{moFormat startDate 'dddd, MMMM Do YYYY, h:mm:ss a'}}</small>
    </h1>
  </template>
```

#### Providing Date Strings

If providing date as a string, you have two options;

1. Provide it as an [ISO8601](http://en.wikipedia.org/wiki/ISO_8601) string `2015-03-05T12:44:38`, other formats *may* work but read how [Moment.js parses strings](http://momentjs.com/docs/#/parsing/string/) for the risks
2. Provide a string in any format but also provide the associated format token eg. `2015332-1732|YYYYDDD-HHmm` where `|` is used as a delimiter between the date string and the date format input. This input format will *not* affect the output format.


```html
  <template name='myTemplate'>
    <h1>
      {{moFormat '07042015|MMDDYYYY' 'dddd, Do [of] MMMM YYYY'}}
    </h1>
  </template>
  <!-- output:<h1>Saturday, 4th of July 2015</h1> -->
```

#### Not providing any date

If you provide null, undefined or it cannot parse the string it will fail silently, returning an empty string (use debug mode for logs).

However, if you set `returnNowIfDateNotGiven` to `true` in config, it will return the current datetime.


#### Providing formatToken shortcuts (aka formatToken library)

This feature enables you to set custom 'shortcuts' to formatTokens making it easier to keep your format tokens in a central place.

**common.js**
```js
mo.configure({
  formatTokens: {
    'shortDate': 'D MMM YY', //3 Jan 15
    'longDate': 'Do [of] MMMM[,] YYYY', //3rd of January, 2015
  }
});
```

**my_template.html**
```html
<template name="myTemplate">
  <div class="panel panel-default">
    <div class="panel-heading">
      <!-- show shortdate on mobile, otherwise show longdate -->
      <span class="visible-xs">
        {{moFormat eventDate 'shortDate'}}
      </span>
      <span class="hidden-xs">
        {{moFormat eventDate 'longDate'}}
      </span>
    </div>
    <div class="panel-body">
      <p>{{eventDescription}}</p>
    </div>
  </div>
</template>
```

#### Providing formatToken functions

This feature enables you to provide a function to the formatToken shortcuts (aka library), this is useful if you want to change the format token string based on the actual Moment object provided.


**common.js**
```js
mo.configure({
  //provide a formatToken that returns the format as a result of a function
  //if it is game day (Friday) return something exciting
  //if it is not game day (not Friday), let me know how long I have to wait
  formatTokens: {
    'gameDay': function () {
      if (this.format('dddd') === 'Friday') {
        //if Friday, return text
        //remember anything inside [] will be a literal string
        return '[Game Day!]';
      }
      //otherwise return just a day with a countdown
      var nextFriday = moment(this).day(5);
      var daysUntilFriday = nextFriday.diff(this, 'days');
      //works out the next Friday and retuns that in the sentence
      return 'dddd ' + '[' + daysUntilFriday + ' days until Game Day]';
    }
  }
});
```

**my_template.js**
```js
  Template.myTemplate.helpers({
    isGameDay: function () {
      //is a Friday
      return moment('2015-08-14', 'YYYY-MM-DD');
    },
    isNotGameDay: function () {
      //is a Sunday
      return moment('2015-08-16', 'YYYY-MM-DD');
    },
  });
```

**my_template.html**
```html
<template name="myTemplate">
  <h1>
    {{moFormat isGameDay 'gameDay'}}
    <!-- returns 'Game Day!' -->
  </h1>
  <h1>
    {{moFormat isNotGameDay 'gameDay'}}
    <!-- returns 'Sunday 5 days until Game Day' -->
  </h1>
```


### moFromNow
http://momentjs.com/docs/#/displaying/fromnow/

You can either use variables passed to the helper or keyword arguments:
* `{{moFromNow date withoutSuffix}}`
* `{{moFromNow d=date withoutSuffix=false}}`

__date__ can be a Javascript Date, moment object or date string (using the default Moment.js parser), it will behave as the date described above

__withoutSuffix__ defaults to false, will return the string with or without the suffix.

### moFrom
http://momentjs.com/docs/#/displaying/from/

You can either use variables passed to the helper or keyword arguments:
* `{{moFrom dateA dateB}}`
* `{{moFrom a=dateA b=dateB}}`

__dateA or dateB__ can be a Javascript Date, moment object or date string (using the default Moment.js parser), it will behave as the date described above.

Can be used with `moNow` to provide a reactive date difference, updated every second


### moDiff
http://momentjs.com/docs/#/displaying/difference/

You can either use variables passed to the helper or keyword arguments:
* `{{moDiff dateA dateB units returnFloat}}`
* `{{moDiff a=dateA b=dateB units='minutes' returnFloat=false}}`

__dateA or dateB__ can be a Javascript Date, moment object or date string (using the default Moment.js parser), it will behave as the date described above.

__units__ defaults to 'seconds', provides the units to the Moment.js function.

__returnFloat__ defaults to false, if true it will provide a float as a result, ie. 3.75 years instead of 3 years.


### moCalendar
http://momentjs.com/docs/#/displaying/calendar-time/

Calendar time displays time relative to a given referenceTime (which defaults to now), it groups the presentation into 'today', 'tomorrow', 'last weekday' or 'next weekday'.

You can either use variables passed to the helper or keyword arguments:
* `{{moCalendar date referenceDate}}`
* `{{moCalendar d=date r=referenceDate}}`

__date__ can be a Javascript Date, moment object or date string (using the default Moment.js parser), it will behave as the date described above.

__referenceDate__ can be a Javascript Date, moment object or date string (using the default Moment.js parser), it will override the reference date (which normally defaults to now).

## Dependencies

### A Note on Moment.js Dependencies
Currently this package depends on the official Moment.js package `momentjs:moment`, please be aware that if you are using any other Moment.js package such as the old `mrt:moment` or some of the moment with langs packages you could end up with two or more copies of Moment.js in your client, there appears to be no simple way to avoid this currently, raise an issue if you feel otherwise.

### Other Dependencies
All other dependencies are currently Meteor packages only.
* [check](https://atmospherejs.com/meteor/check)
* [underscore](https://atmospherejs.com/meteor/underscore)
* [reactive](https://atmospherejs.com/meteor/reactive)
* [templating](https://atmospherejs.com/meteor/templating)
* [ecmascript](https://atmospherejs.com/meteor/ecmascript)


## Configuration

```js
  mo.configure({
    //will return current date & time if date not given to a moment helper
    returnNowIfDateNotGiven: false,
    //enable the debug mode (console logs)
    debug: false,
    //enable shortcuts to your favorite tokens
    //http://momentjs.com/docs/#/displaying/format/
    //default format should be set as 'default'
    formatTokens: {
      'default': 'LLL', // defaults to locale date format
      //Month name, day of month, year, time
    }
  });
```

## Debug Mode

Will provide some useful console logs, enable it with the config above.


## Contributions, Issues & Improvements

Any suggestions on api/interface improvements would also be appreciated.

To test the package locally
```
  #cd to the package directory
  meteor test-packages ./
```
