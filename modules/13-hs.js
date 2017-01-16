/**
 * Heap Sort
 */

const { fs, StringUtil, Sorting } = require('./utils');

let a = StringUtil.getIntArrayFromString(fs.myInputAsArray()[1]);

Sorting.heapSort(a);

fs.myOutput(a.join(' '));
