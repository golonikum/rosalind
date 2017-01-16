/**
 * Breadth-First Search
 */

const { fs, Digraph, Queue, BreadthFirstPaths } = require('./utils');

let dg = new Digraph();
let bfs = new BreadthFirstPaths(dg, 0);
let output = [];

for (let v = 0; v < dg.v(); v++) {
    let path = bfs.pathTo(v);
    if (path == null) output.push(-1);
    else path.length == 0 ? output.push(0) : output.push(path.length - 1);
}
fs.myOutput(output.join(' '));
