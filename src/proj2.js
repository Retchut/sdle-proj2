import GUN from "https://cdn.skypack.dev/gun";
import { initializeCanvas, updateCanvas } from './canvas.js';
import { printNode } from "./nodes.js";

const gun = GUN({localStorage : false});

//const node1Name = 'A';
//const node1Canvas = initializeCanvas();
//const node1 = gun.get(node1Name).put({ id: node1Name, subscriptions : {}, changes : {}, canvas : node1Canvas })
// ocasionally store canvas on disk ?

//var node2Canvas = initializeCanvas(gun);

const node2Name =  "Node 2";
var node2 = gun.get(node2Name)
const canvas = initializeCanvas(gun);
node2.get('canvas').put(initializeCanvas(gun))

node2.get('iddd').put(node2Name)
node2.get('subscriptions').put("aaaa")
node2.get('subscriptions').put("ss")
node2.get('subscriptions').put("ssss")


canvas.put(null)

var a = []
canvas.map(function(item, key){ // print them back out
  a.push(item)
});
console.log(a)


console.log("node2:")
node2.map().once(function(item, key){
    console.log("key: " + key)
    console.log("value: " + item)
});





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