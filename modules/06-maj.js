/**
 * Majority Element
 */

const { fs, StringUtil, Sorting } = require('./utils');

let arrays = fs.myInputArrays();

fs.myOutput( arrays.map(a => Sorting.majority(a)).join(' ') );


