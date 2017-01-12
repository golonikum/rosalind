/**
 * Binary Search
 */

const { fs, StringUtil, Sorting } = require('./utils');

let data = fs.myInput().split('\r\n'),
    sortedArray = StringUtil.getIntArrayFromString(data[2]),
    searchNumbers = StringUtil.getIntArrayFromString(data[3]);

function foundIndices(sortedArr, searchArr) {
    let foundIndicies = [];
    searchArr.forEach(num => {
        foundIndicies.push(Sorting.binarySearch(sortedArr, num, 0, sortedArr.length - 1) + 1);
    });
    return foundIndicies;
}

fs.myOutput(foundIndices(sortedArray, searchNumbers).join(' '));
