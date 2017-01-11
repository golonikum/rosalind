/**
 * Fibonacci Numbers
 */

function fiboR(n) {
    if (n > 1) {
        return fiboR(n-1) + fiboR(n-2)
    } else {
        return n;
    }
}

function fibo(n) {
    var filled = [0, 1],
        max = 25;

    for (var i = 2; i <= max; i++) {
        filled[i] = filled[i-1] + filled[i-2];
    }

    return filled[n];
}

console.log(fiboR(21));
console.log(fibo(21));