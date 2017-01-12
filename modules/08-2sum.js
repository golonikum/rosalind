/**
 * 2SUM
 */

const { fs, Sorting, StringUtil } = require('./utils');

let arrays = fs.myInputArrays().map( array => array.map( (num, index) => { return {num, index} } ) );

let output = [];
arrays.forEach( array => {
    let comparator = (item1, item2) => {
        let i1 = item1.num ? item1.num : item1,
            i2 = item2.num ? item2.num : item2;
        if (i1 > i2) return 1;
        else if (i1 < i2) return -1;
        else return 0;
    };
    Sorting.insertionSort(array, comparator);

    let found = '-1';
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (item.num < 0) {
            let foundIndex = Sorting.binarySearch(array, -1*item.num, 0, array.length - 1, comparator);
            if (foundIndex > -1) {
                found = [item.index+1, array[foundIndex].index+1].sort().join(' ');
            }
        } else {
            break;
        }
    }
    output.push(found);
});

fs.myOutput(output.join('\r\n'));