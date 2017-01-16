/**
 * Merge Two Sorted Arrays
 */

const { fs, StringUtil } = require('./utils');

let dataArr = fs.myInputAsArray(),
    sortedArrays = [1, 3].map( i => StringUtil.getIntArrayFromString(dataArr[i]) );

function mergeSorted(a1, a2) {
    let i = 0,
        j = 0,
        merged = [];

    while ( i < a1.length || j < a2.length ) {
        if (a1[i] <= a2[j] || a2[j] === undefined) {
            merged.push(a1[i]);
            i++;
        } else {
            merged.push(a2[j]);
            j++;
        }
    }

    return merged;
}

fs.myOutput(mergeSorted(sortedArrays[0], sortedArrays[1]).join(' '));