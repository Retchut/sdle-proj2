import * as App from "./Peer.js";
import GUN from "https://cdn.skypack.dev/gun";
import * as Nodes from "./nodes.js";



localStorage.clear()

/*
var node1 = new App.Peer("node_1")
var node2 = new App.Peer("node_2")

//node2.print(false)

//node1.addChange({ timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' })

//var testObj = { 0: [1,2]}

var jovem = "2"
var a = []

node1.node.once(function (data) {
    a[0] = "2"
})

a.jo= "jo"

console.log(Object.keys(a))
*/

const gun = Gun();
const jeff = gun.get('jeff')
jeff.put({'name':'jeff', 'code' : 1});
let code = [];
jeff.get('code').once((value) => {
  code.push(value)
});
console.log(code)
