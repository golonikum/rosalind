/**
 * Degree Array
 */

const { fs, argv, Graph } = require('./utils');

function allDegrees(graph) {
    let degrees = [];
    for (let i = 0; i < graph.v(); i++) {
        degrees.push( graph.adj(i).length );
    }
    fs.myOutput(degrees.join(' '));
}

allDegrees(new Graph());
