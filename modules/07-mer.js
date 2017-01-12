/**
 * Merge Two Sorted Arrays
 */

const { fs, Sorting, StringUtil } = require('./utils');

let dataArr = fs.myInputAsArray(),
    sortedArrays = [1, 3].map( i => StringUtil.getIntArrayFromString(dataArr[i]) );

fs.myOutput(Sorting.mergeSorted(sortedArrays[0], sortedArrays[1]).join(' '));