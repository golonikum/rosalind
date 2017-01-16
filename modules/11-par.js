/**
 * 2-Way Partition
 */

const { fs, StringUtil, Sorting } = require('./utils');

let a = StringUtil.getIntArrayFromString(fs.myInputAsArray()[1]);

let i = 1,
    j = a.length - 1,
    first = a[0];

while (i < j) {
    while(a[i] <= first && i < (a.length - 1))
        i++;
    while(a[j] > first && j > 0)
        j--;
    if (i < j)
        Sorting.swap(a, i, j);
}

Sorting.swap(a, 0, j);

fs.myOutput(a.join(' '));

