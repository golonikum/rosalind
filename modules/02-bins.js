/**
 * Binary Search
 */

const { fs, StringUtil } = require('./utils');

let data = fs.myInput().split('\r\n'),
    sortedArray = StringUtil.getIntArrayFromString(data[2]),
    searchNumbers = StringUtil.getIntArrayFromString(data[3]);

function binarySearch(arr, num, fromInd, toInd) {
    if (num < arr[fromInd] || num > arr[toInd]) {
        return -1;
    } else if (fromInd == toInd) {
        return ( num == arr[fromInd] ? fromInd + 1 : -1 );
    } else {
        let middleInd = ~~( (fromInd + toInd) / 2 ),
            middleNum = arr[middleInd];

        if (num <= middleNum) {
            return binarySearch(arr, num, fromInd, middleInd);
        } else {
            return binarySearch(arr, num, middleInd + 1, toInd);
        }
    }
}

function foundIndices(sortedArr, searchArr) {
    let foundIndicies = [];
    searchArr.forEach(num => {
        foundIndicies.push(binarySearch(sortedArr, num, 0, sortedArr.length - 1));
    });
    return foundIndicies;
}

fs.myOutput(foundIndices(sortedArray, searchNumbers).join(' '));
