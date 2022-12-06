import GUN from "https://cdn.skypack.dev/gun";
import { initializeCanvas, updateCanvas } from './canvas.js';
import { printNode } from "./nodes.js";
import * as UNSET from "https://cdn.jsdelivr.net/npm/gun/lib/unset.js";

var gun = GUN();

//const node1Name = 'A';
//const node1Canvas = initializeCanvas();
//const node1 = gun.get(node1Name).put({ id: node1Name, subscriptions : {}, changes : {}, canvas : node1Canvas })
// ocasionally store canvas on disk ?

//var node2Canvas = initializeCanvas(gun);

const node2Name =  "Node_2";
const emptyCanvas = initializeCanvas(gun);
//var node2 = gun.get(node2Name).put({canvas: emptyCanvas})
gun.get(node2Name).get('canvas').put(null)
gun.get(node2Name).get('canvas').put({canvas: null})

var gun2 = gun.get('data').put({
    object1: {ii: "ii"},
    object2: null
})

// set 'object3' to a new node
gun2.get('object3').put({
  field: 'value'
})
//gun2.get('object3').put(null)

//console.log("gun2: ")
gun2.map().once(function(item, key){
    //console.log(item)
    //console.log(key)
})

var a = []
gun.get(node2Name).get('canvas').map(function(item, key){ // print them back out
  a.push(item)
});
console.log("node2:")
console.log(a)
gun.get(node2Name).get('canvas').once(function(item, key){
  //console.log("key: " + key)
  console.log("value: " + item)
  console.log("key: " + key)
});

//node2.unset(node2.get('subscriptions'))

/*
var myArray = [{hello: 'world', timestamp: 12}, {hello: 'are', timestamp: 1}, {hello: 'world', timestamp: 13}, {hello: 'wonderful', typestamp: 33}];
var list = gun.get('list');

myArray.forEach(function(item){
  list.set(item);
});

var a = []
list.map(function(item, key){ // print them back out
  a.push(item)
});

//console.log(a)

const changesComparisonCallback = (arrayItemA, arrayItemB) => {
    if (arrayItemA.timestamp < arrayItemB.timestamp) {
        return -1
    }
    if (arrayItemA.timestamp > arrayItemB.timestamp) {
        return 1
    }
    return 0
}
myArray.sort(changesComparisonCallback)
*/