const argv = require('yargs')
    .usage('Usage: node $0 --in=[filepath] --out=[filepath]')
    .argv;

const path = require('path');

let fs = require('fs');

fs.myOutput = function(str) {
    if (argv.out) {
        fs.writeFileSync(argv.out, str, {encoding: 'utf-8'});
    } else {
        console.log(str);
    }
};
fs.myInput = function() {
    let fullFilename = process.argv[1],
        filename = path.basename(fullFilename),
        dir = path.dirname(fullFilename),
        file = argv.in || path.resolve(dir, '../in/', `${filename}.txt`);

    return fs.readFileSync(file, {encoding: 'utf-8'});
};

class Graph {
    /**
     * read a graph from file
     */
    constructor() {
        let edgeArr = fs
            .myInput()
            .split('\r\n')
            .map(item => item
                .split(' ')
                .map(el => ~~el)
            );
        this._adj = [];
        this._v = edgeArr[0][0];
        this._e = 0;
        for(let i = this._v; i--;) this._adj[i] = [];
        edgeArr.forEach( (edge, index) => index > 0 && edge[0] > 0 && this.addEdge(edge[0] - 1, edge[1] - 1));
    }

    /**
     * number of vertices
     */
    v() {
        return this._v;
    }

    /**
     * number of edges
     */
    e() {
        return this._e;
    }

    /**
     * add edge v-w to this graph
     * @param v
     * @param w
     */
    addEdge(v, w) {
        this._adj[v].push(w);
        this._adj[w].push(v);
        this._e++;
    }

    /**
     * vertices adjacent to v
     * @param v
     */
    adj(v) {
        return this._adj[v];
    }

    /**
     * string representation
     */
    toString() {
        let output = `${this._v} vertices, ${this._e} edges\r\n`;
        this._adj.forEach( (adj, index) => output += `${index}: ${adj.join(' ')}\r\n` );
        return output;
    }
}

class StringUtil {
    static getIntArrayFromString(str, separator=' ') {
        return str.split(separator).map( item => ~~item );
    }
}

module.exports = {
    argv,
    Graph,
    fs,
    StringUtil
};