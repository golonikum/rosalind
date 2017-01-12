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
        extName = path.extname(filename),
        dir = path.dirname(fullFilename),
        file = argv.in || path.resolve(dir, '../in/', `${filename.replace(extName, '')}`);

    return fs.readFileSync(file, {encoding: 'utf-8'});
};
fs.myInputAsArray = function() {
    return fs.myInput().split('\r\n');
};
fs.myInputArrays = function() {
    let dataArr = fs.myInputAsArray(),
        arrCount = ~~dataArr[0].split(' ')[0],
        arrays = [];
    for (let i = 0; i < arrCount; i++) {
        arrays.push( StringUtil.getIntArrayFromString(dataArr[i + 1]) );
    }
    return arrays;
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

class Sorting {
    static binarySearch(arr, num, fromInd, toInd, comparator=Sorting.comparator) {
        if (comparator(num, arr[fromInd]) < 0 || comparator(num, arr[toInd]) > 0) {
            return -1;
        } else if (fromInd == toInd) {
            return ( comparator(num, arr[fromInd]) == 0 ? fromInd : -1 );
        } else {
            let middleInd = ~~( (fromInd + toInd) / 2 ),
                middleNum = arr[middleInd];

            if (comparator(num, middleNum) <= 0) {
                return Sorting.binarySearch(arr, num, fromInd, middleInd, comparator);
            } else {
                return Sorting.binarySearch(arr, num, middleInd + 1, toInd, comparator);
            }
        }
    }

    static swap(a, i, j) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    static comparator(first, second) {
        if (first > second) return 1;
        else if (first < second) return -1;
        else return 0;
    }

    static insertionSort(a, comparator=Sorting.comparator) {
        let counter = 0;
        for (let i = 1; i < a.length; i++) {
            let j = i;
            while (j > 0 && comparator(a[j - 1], a[j]) > 0) {
                Sorting.swap(a, j, j - 1);
                j = j - 1;
                counter++;
            }
        }
        return counter;
    }

    static majority(a) {
        if (a.length == 0) {
            return -1;
        } else if (a.length == 1) {
            return a[0];
        }
        Sorting.insertionSort(a);
        let needCount = a.length / 2,
            current = a[0],
            count = 1;
        for (let i = 1; i < a.length; i++) {
            let num = a[i];
            if (num == current) {
                count++;
                if (count > needCount) {
                    return current;
                }
            } else {
                count = 1;
                current = num;
            }
        }
        return -1;
    }

    static mergeSorted(a1, a2) {
        let i = 0,
            j = 0,
            merged = [];

        while ( i < a1.length || j < a2.length ) {
            if (a1[i] <= a2[j] || a2[j] === undefined) {
                merged.push(a1[i]);
                i++;
            } else {
                merged.push(a2[j]);
                j++;
            }
        }

        return merged;
    }
}


module.exports = {
    argv,
    Graph,
    fs,
    StringUtil,
    Sorting
};