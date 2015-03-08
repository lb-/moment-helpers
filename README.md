# Moment Helpers

A set of helpers that closely follows the Moment.js api giving you easy access
to formatting and other utilities.


## Installation

```bash
  meteor add lbee:moment-helpers
```

## Examples

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



### moFromNow
http://momentjs.com/docs/#/displaying/fromnow/

You can either use variables passed to the helper or keyword arguments:
* `{{moFromNow date withoutSuffix}}`
* `{{moFromNow d=date withoutSuffix=false}}`

__date__ can be a Javascript Date, moment object or date string (using the default Moment.js parser), it will behave as the date described above

__withoutSuffix__ defaults to false, will return the string with or without the suffix.


### moDiff
http://momentjs.com/docs/#/displaying/difference/

You can either use variables passed to the helper or keyword arguments:
* `{{moDiff dateA dateB units returnFloat}}`
* `{{moDiff a=dateA b=dateB units='minutes' returnFloat=false}}`

__dateA or dateB__ can be a Javascript Date, moment object or date string (using the default Moment.js parser), it will behave as the date described above.

__units__ defaults to 'seconds', provides the units to the Moment.js function.

__returnFloat__ defaults to false, if true it will provide a float as a result, ie. 3.75 years instead of 3 years.


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
      'default': 'YYYY-MM-DD',
    }
  });
```

## Debug Mode

Will provide some useful console logs, enable it with the config above.


## Contributions, Issues & Improvements

This is a pretty early prototype and may have bugs/issues, happy to take issues and will get to it when I can, also happy to take pull requests (with tests).

Any suggestions on api/interface improvements would also be appreciated.
