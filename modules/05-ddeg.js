/**
 * Double-Degree Array
 */

const { fs, Graph } = require('./utils');

(function ddeg() {
    let g = new Graph();
    let arr = [];

    for (let i = 0; i < g.v(); i++) {
        arr.push(g.adj(i).reduce( (total, curr) => total + g.adj(curr).length, 0 ));
    }

    fs.myOutput(arr.join(' '));
})();




