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

class Digraph extends Graph {
    /**
     * read a graph from file
     */
    constructor() {
        super();
    }

    /**
     * add edge v-w to this graph
     * @param v
     * @param w
     */
    addEdge(v, w) {
        this._adj[v].push(w);
        this._e++;
    }
}

class StringUtil {
    static getIntArrayFromString(str, separator=' ') {
        return str.split(separator).map( item => ~~item );
    }
    static getIntMapFromString(str, separator=' ') {
        let map = {};
        str.split(separator).forEach( (item, index) => map[item] = index );
        return map;
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

    static merge(a, aux, lo, mid, hi) {
        // copy to aux[]
        for (let k = lo; k <= hi; k++) {
            aux[k] = a[k];
        }

        // merge back to a[]
        let i = lo, j = mid+1;
        for (let k = lo; k <= hi; k++) {
            if (i > mid)
                a[k] = aux[j++];
            else if (j > hi)
                a[k] = aux[i++];
            else if (Sorting.comparator(aux[j], aux[i]) < 0)
                a[k] = aux[j++];
            else
                a[k] = aux[i++];
        }
    }

    static mergeSort(a, aux, lo, hi) {
        if (typeof lo == 'undefined') {
            lo = 0;
            hi = a.length - 1;
        }
        if (hi <= lo) return;
        let mid = lo + Math.floor( (hi - lo)/2 );
        Sorting.mergeSort(a, aux, lo, mid);
        Sorting.mergeSort(a, aux, mid+1, hi);
        Sorting.merge(a, aux, lo, mid, hi);
    }

    static sink(a, k, N) {
        while (2*k <= N) {
            let j = 2*k;
            if (j < N && a[j] < a[j+1]) j++;
            if (a[k] >= a[j]) break;
            Sorting.swap(a, k, j);
            k = j;
        }
    }

    static heap(a) {
        for (let k = Math.floor((a.length - 1) / 2); k >= 1; k--)
            Sorting.sink(a, k, a.length - 1);
    }

    static heapSort(a) {
        a.unshift(Infinity);
        Sorting.heap(a);

        let last = a.length - 1;
        while ( last > 1 ) {
            Sorting.swap(a, 1, last);
            last--;
            Sorting.sink(a, 1, last);
        }

        a.splice(0, 1);
    }
}

class Queue {
    constructor() {
        this.array = [];
    }
    isEmpty() {
        return this.array.length == 0;
    }
    enqueue(item) {
        this.array.push(item);
    }
    dequeue() {
        return this.array.shift();
    }
    getCount() {
        return this.array.length;
    }
}

class BreadthFirstPaths {
    constructor(g, s) {
        this.g = g;
        this.s = s;
        this.marked = new Array(g.v()).fill(false);
        this.edgeTo = new Array(g.v()).fill(0);
        this.queue = new Queue();
        this.bfs();
    }
    bfs() {
        this.marked[this.s] = true;
        this.queue.enqueue(this.s);

        while (!this.queue.isEmpty()) {
            let v = this.queue.dequeue(); // Remove next vertex from the queue.
            this.g.adj(v).forEach(w => {
                if ( !this.marked[w] ) {   // For every unmarked adjacent vertex,
                    this.edgeTo[w] = v;    // save last edge on a shortest path,
                    this.marked[w] = true; // mark it because path is known,
                    this.queue.enqueue(w); // and add it to the queue.
                }
            });
        }
    }
    hasPathTo(v) {
        return this.marked[v];
    }
    pathTo(v) {
        if ( !this.hasPathTo(v) ) return null;
        let path = [];
        for (let x = v; x != this.s; x = this.edgeTo[x])
            path.push(x);
        path.push(this.s);
        return path;
    }
}

module.exports = {
    argv,
    Graph,
    Digraph,
    Queue,
    BreadthFirstPaths,
    fs,
    StringUtil,
    Sorting
};