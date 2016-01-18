"use strict";

var packageName = 'lbee:moment-helpers';
var packageVersion = '1.3.0';
var meteorVersionsFrom = '1.2.1';
var momentVersion = '2.11.1';

Package.describe({
  name: packageName,
  version: packageVersion,
  summary: 'Date format helpers from Moment.js',
  git: 'https://github.com/lb-/moment-helpers',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  //meteor version
  api.versionsFrom(meteorVersionsFrom);

  //main package requirements
  // api.use('momentjs:moment@${momentVersion}');
  api.use('momentjs:moment@' + momentVersion);
  api.use('ecmascript');
  api.use('es5-shim');
  api.use('check');
  api.use('underscore');
  api.use('reactive-var', 'client');
  api.use('templating', 'client');

  //main files
  api.addFiles('common.js');
  api.addFiles('client.js', 'client');

  //export mo
  api.export('mo');
});

Package.onTest(function(api) {
  var both = ['client', 'server'];

  //meteor version
  api.versionsFrom(meteorVersionsFrom);

  //add main packages
  api.use('tinytest');
  api.use('check');

  // api.use('momentjs:moment@${momentVersion}');
  api.use('momentjs:moment@' + momentVersion);
  api.use('ecmascript');
  api.use('es5-shim');
  api.use('underscore');
  api.use('reactive-var', 'client');
  api.use('templating', 'client');
  api.use('tinytest');

  //use this package
  api.use(packageName);

  //main files
  api.addFiles('common.js');
  api.addFiles('client.js', 'client');

  //add test files
  api.addFiles('tests/templates.html', 'client');
  api.addFiles('tests/tests.js');
  api.addFiles('tests/locale_tests.js', 'client');
});
