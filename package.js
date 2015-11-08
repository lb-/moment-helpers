"use strict";

var packageName = 'lbee:moment-helpers';
var packageVersion = '1.2.0';

Package.describe({
  name: packageName,
  version: packageVersion,
  summary: 'Date format helpers from Moment.js',
  git: 'https://github.com/lb-/moment-helpers',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  var both = ['client', 'server'];

  //main package requirements
  api.use('momentjs:moment@2.10.6', both);
  api.use('check', both);
  api.use('underscore', both);
  api.use('reactive-var', 'client');
  api.use('templating', 'client');

  //meteor version
  api.versionsFrom('METEOR@1.0');

  //main files
  api.addFiles('common.js');
  api.addFiles('client.js', 'client');

  //export mo
  api.export('mo');
});

Package.onTest(function(api) {
  var both = ['client', 'server'];

  //add main packages
  api.use('tinytest');
  api.use('check');
  api.use('momentjs:moment');
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
