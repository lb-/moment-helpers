"use strict";

var packageName = 'lbee:moment-helpers';

Package.describe({
  name: packageName,
  version: '0.0.1',
  summary: 'Date format helpers from Moment.js',
  git: 'https://github.com/lb-/moment-helpers',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  //main package requirements
  api.use('momentjs:moment@2.9.0');
  api.use('underscore');
  api.use('templating', 'client');

  //meteor version
  api.versionsFrom('1.0.3.2');

  //main files
  api.addFiles('common.js');
  api.addFiles('client.js', 'client');

  //export mo
  api.export('mo');
});

Package.onTest(function(api) {
  //add main packages
  api.use('tinytest');
  api.use('momentjs:moment');
  api.use('underscore');
  api.use('templating', 'client');
  api.use('tinytest');
  // api.use('ui');
  // api.use('test-helpers');
  // api.use('session');
  // api.use('templating');
  // api.use('blaze');
  // api.use('mongo-livedata');

  //use this package
  api.use(packageName);

  //main files
  api.addFiles('common.js');
  api.addFiles('client.js', 'client');

  //add test files
  api.addFiles('testing_templates.html', 'client');
  api.addFiles('tests.js');
});
