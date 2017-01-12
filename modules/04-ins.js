/**
 * Insertion Sort
 */

const { fs, StringUtil, Sorting } = require('./utils');

let data = fs.myInput().split('\r\n'),
    arr = StringUtil.getIntArrayFromString(data[1]),
    swaps = Sorting.insertionSort(arr);

fs.myOutput(swaps.toString());


