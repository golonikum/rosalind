/**
 * Building a Binary Heap (for Priority Queue)
 */

const { fs, StringUtil, Sorting } = require('./utils');

let dataArr = fs.myInputAsArray(),
    array = StringUtil.getIntArrayFromString(dataArr[1]);

array.unshift(Infinity);

function sink(k, array) {
    let N = array.length - 1;
    while (2*k <= N) {
        let j = 2*k;
        if (j < N && array[j] < array[j+1]) j++;
        if (array[k] >= array[j]) break;
        Sorting.swap(array, k, j);
        k = j;
    }
}

for (let k = Math.floor((array.length - 1) / 2); k >= 1; k--) sink(k, array);

array.splice(0, 1);
fs.myOutput(array.join(' '));