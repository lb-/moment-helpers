if ( Meteor.isClient ) {

  var dateObject = new Date( '2015-03-14 10:12:00' );
  var dateMoment = moment( dateObject );

  Tinytest.add( 'init templates', function ( test ) {
    test.equal( Blaze.toHTML( Template.testTemplateInit ), 'test' );
  });

  Tinytest.add( 'helper with all variables', function ( test ) {

    test.equal( Blaze.toHTMLWithData( Template.moFormatArgs, {
      date: dateMoment,
      formatToken: 'YYYY-MM-DD Dd Mo'
    }), '2015-03-14 146 3rd' );

    test.equal( Blaze.toHTMLWithData( Template.moFormatArgs, {
      date: dateObject,
      formatToken: 'YYYY-MM-DD Dd Mo'
    }), '2015-03-14 146 3rd' );

    test.equal( Blaze.toHTMLWithData( Template.moFormatArgs, {
      date: null,
      formatToken: 'YYYY-MM-DD Dd Mo'
    }), '2015-03-14 146 3rd' );

  });

}
