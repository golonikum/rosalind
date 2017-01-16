/**
 * Merge Sort
 */

const { fs, StringUtil, Sorting } = require('./utils');

let a = StringUtil.getIntArrayFromString(fs.myInputAsArray()[1]),
    aux = new Array(a.length);

Sorting.mergeSort(a, aux);

fs.myOutput(a.join(' '));
