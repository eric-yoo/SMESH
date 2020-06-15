const depGraph = require('es-dependency-graph');
const fs = require('fs');

const root = process.argv[2];
const entry = process.argv[3];

var tree = {}
var current = [root]

const getDep = (file, partition) => {
    var data = fs.readFileSync(file, 'utf-8').toString();
    var result = depGraph(data, {
        includeBindings: true
    });
    tree[partition] = result
    
    if (result['imports']){
        for (imported in result['imports']){
            if (!tree[imported]){
                if (partition != 'main') {
                    path = partition.match(/(.*)[\/\\]/)[1]||'';
                    current.push('/'+path);
                    getDep(current.join('') +'/' +imported, imported)
                    current.pop();
                }
                else getDep(current +'/' +imported, imported)
            }
        }
    }
}
getDep(root+'/' +entry, 'main')

fs.writeFileSync('module_dep.json', JSON.stringify(tree), 'utf-8');

