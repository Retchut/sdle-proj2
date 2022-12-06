import * as App from "./Peer.js";
import GUN from "https://cdn.skypack.dev/gun";
import * as Nodes from "./nodes.js";



localStorage.clear()

//var node1 = new App.Peer("node_1")



var node2 = new App.Peer("node_2")
//node2.print()

//Nodes.printNode(node2.node.back(1).get("node_1"))

//node2.print()
node2.subscribe("node_2")
//node2.subscribe("node_1")
//node2.subscribe("node_4")
//node2.unsubscribe("node_4")
//node2.print()
//console.log(node2.node)

var a = []
a.push("a")
node2.node.get('subscriptions').map().once(function(item, key){ // print them back out
    a.push(item)
});
console.log(a)