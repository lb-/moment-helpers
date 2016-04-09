const packageName = 'lbee:moment-helpers';
const packageVersion = '1.3.3';
const meteorVersionsFrom = '1.3';
const momentVersion = '2.12.0';

// console.log( `momentVersion: ${momentVersion}` );

Package.describe({
  name: packageName,
  version: packageVersion,
  summary: 'Date format helpers from Moment.js',
  git: 'https://github.com/lb-/moment-helpers',
  documentation: 'README.md'
});

Package.onUse( function ( api ) {

  // meteor version
  api.versionsFrom( meteorVersionsFrom );

  // main package requirements
  // api.use( `momentjs:moment@${momentVersion}` );
  api.use( 'momentjs:moment@' + momentVersion );
  api.use( 'ecmascript' );
  api.use( 'reactive-var', 'client' );
  api.use( 'templating', 'client' );
  api.imply( 'underscore' );
  api.imply( 'check' );

  // main files
  api.addFiles( 'common.js' );
  api.addFiles( 'client.js', 'client' );

  // export mo
  api.export( 'mo' );

});

Package.onTest( function ( api ) {

  // Meteor version
  api.versionsFrom( meteorVersionsFrom );

  // use this package
  api.use( packageName );

  // use packages for testing
  api.use( 'tinytest' );

  // use packages that are needed for this package
  api.use( 'ecmascript' );
  api.use( 'templating', 'client' );
  api.use( 'reactive-var', 'client' );

  // use Moment package
  api.use( 'momentjs:moment@' + momentVersion );

  // add main files
  api.addFiles( 'common.js' );
  api.addFiles( 'client.js', 'client' );

  // add test files
  api.addFiles( 'tests/templates.html', 'client' );
  api.addFiles( 'tests/tests.js' );
  api.addFiles( 'tests/locale_tests.js', 'client' );

});
