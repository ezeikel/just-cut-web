/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);
