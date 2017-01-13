/**
 * 2SUM
 */

const { fs } = require('./utils');

let arrays = fs.myInputArrays().map( array => array.map( (num, index) => { return {num, index: index+1} } ) ),
    output = [],
    comparator = (item1, item2) => {
        let i1 = item1.num != undefined ? item1.num : item1,
            i2 = item2.num != undefined ? item2.num : item2;
        if (i1 > i2) return 1;
        else if (i1 < i2) return -1;
        else return 0;
    };

arrays.forEach(array => {
    array.sort(comparator);

    let found = '-1',
        i = 0,
        j = array.length - 1;

    while (i < j) {
        if (array[i].num + array[j].num > 0) j--;
        else if (array[i].num + array[j].num < 0) i++;
        else {
            found = [array[i].index, array[j].index].sort(comparator).join(' ');
            break;
        }
    }

    output.push(found);
});

fs.myOutput(output.join('\r\n'));
