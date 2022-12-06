import GUN from "https://cdn.skypack.dev/gun";
import { initializeCanvas, updateCanvas } from './canvas.js';
import { printNode } from "./nodes.js";

var gun = GUN();

//const node1Name = 'A';
//const node1Canvas = initializeCanvas();
//const node1 = gun.get(node1Name).put({ id: node1Name, subscriptions : {}, changes : {}, canvas : node1Canvas })
// ocasionally store canvas on disk ?

//var node2Canvas = initializeCanvas(gun);

const node2Name =  "Node_2";
var node2 = gun.get(node2Name)
var canvas = initializeCanvas(gun);
node2.get('canvas').put(initializeCanvas(gun))

node2.get('iddd').put(node2Name)
node2.get('subscriptions').put("aaaa")
node2.get('subscriptions').put("ss")
node2.get('subscriptions').put("ssss")
//node2.get('canvas').once(data => console.log(data._['#']))  // test/node


var gun2 = gun.get('data')
gun2.put({
  object1: {ii: "ii"},
  object2: {oo: "oo"}
})

// set 'object3' to a new node
gun2.get('object3').put({
  field: 'value'
})

gun2.get('object3').put(null)

console.log(gun2)

var a = []
canvas.map(function(item, key){ // print them back out
  a.push(item)
});
//console.log(a)


//console.log("node2:")
node2.map().once(function(item, key){
    //console.log("key: " + key)
    //console.log("value: " + item)
});



console.log("Friends test:")
var alice = gun.get('alice').put({name: 'alice', age: 22});
var bob = gun.get('bob').put({name: 'bob', age: 24});
var bob2 = gun.get('bob').put(null);
var carl = gun.get('carl').put({name: 'carl', age: 16});
var dave = gun.get('dave').put({name: 'dave', age: 42});

console.log(gun.get('bob'))

console.log("END Friends test")


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