

1. Set up a simple test

2. look at this
https://forums.meteor.com/t/momentjs-moment-errors/18950/3

 not working
 var searchdate = moment().subtract(7, 'day')

 working
 var searchdate = moment().subtract(7, 'day').format("YYYY-MM-DD")
