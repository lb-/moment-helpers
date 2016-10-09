const packageName = 'lbee:moment-helpers';
const packageVersion = '1.3.6';
const meteorVersion = '1.4.1.2';
const momentVersion = 'momentjs:moment@2.15.1';

Package.describe({
  name: packageName,
  version: packageVersion,
  summary: 'Date format helpers from Moment.js',
  git: 'https://github.com/lb-/moment-helpers',
  documentation: 'README.md',
});

const onUse = function onUse(api) {
  // meteor version
  api.versionsFrom(meteorVersion);

  // main package requirements
  api.use(momentVersion);
  api.use('ecmascript');
  api.use('reactive-var', 'client');
  api.use('templating', 'client');
  api.imply('underscore');
  api.imply('check');

  // main files
  api.addFiles('common.js');
  api.addFiles('client.js', 'client');

  // export mo
  api.export('mo');
};

const onTest = function onTest(api) {
  // Meteor version
  api.versionsFrom(meteorVersion);

  // use this package
  api.use(packageName);

  // use packages for testing
  api.use('tinytest');

  // use packages that are needed for this package
  api.use('ecmascript');
  api.use('templating', 'client');
  api.use('reactive-var', 'client');

  // use Moment package
  api.use(momentVersion);

  // add main files
  api.addFiles('common.js');
  api.addFiles('client.js', 'client');

  // add test files
  api.addFiles('tests/templates.html', 'client');
  api.addFiles('tests/tests.js');
  api.addFiles('tests/locale_tests.js', 'client');
};

Package.onTest(onTest);
Package.onUse(onUse);
