/**
 * Majority Element
 */

const { fs, StringUtil, Sorting } = require('./utils');

let dataArr = fs.myInput().split('\r\n'),
    arrCount = ~~dataArr[0].split(' ')[0],
    arrays = [];

for (let i = 0; i < arrCount; i++) {
    arrays.push( StringUtil.getIntArrayFromString(dataArr[i + 1]) );
}

fs.myOutput( arrays.map(a => Sorting.majority(a)).join(' ') );


