/**
 * Building a Binary Heap (for Priority Queue)
 */

const { fs, StringUtil, Sorting } = require('./utils');

let dataArr = fs.myInputAsArray(),
    array = StringUtil.getIntArrayFromString(dataArr[1]);

array.unshift(Infinity);
//fs.myOutput(array);

// for (let i = array.length; i > 1; i--) {
//     if (i % 2 == 1 && array[i] > array[i - 1]) {
//         Sorting.swap(array, i, i - 1);
//         // console.log(array);
//     }
// }

// function sink(k, array) {
//     let N = array.length - 1;
//     while (2*k <= N) {
//         let j = 2*k;
//         if (j < N && array[j] < array[j+1]) j++;
//         if (array[k] >= array[j]) break;
//         console.log(k + ' ' + j);
//         Sorting.swap(array, k, j);
//         k = j;
//     }
// }
//
// for (let k = Math.floor((array.length - 1) / 2); k >= 1; k--) sink(k, array);


for (let i = array.length; i > 1; i--) {
    let j = i;
    while (array[j] > array[Math.floor(j / 2)]) {
        Sorting.swap(array, j, Math.floor(j / 2));
        // console.log(array);
        j = Math.floor(j / 2);
    }

    // if (j % 2 == 1 && array[j] > array[j - 1]) {
    //     Sorting.swap(array, j, j - 1);
    //     // console.log(array);
    // }


    if (i != j) i++;

}

array.splice(0, 1);
fs.myOutput(array);