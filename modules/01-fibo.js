/**
 * Fibonacci Numbers
 */

const fs = require('./utils').fs;

function fiboR(n) {
    if (n > 1) {
        return fiboR(n-1) + fiboR(n-2)
    } else {
        return n;
    }
}

function fibo(n) {
    let filled = [0, 1];

    for (let i = 2; i <= n; i++) {
        filled[i] = filled[i-1] + filled[i-2];
    }

    return filled[n];
}


let n = ~~fs.myInput();
fs.myOutput( fibo(n).toString() );