import GUN from "https://cdn.skypack.dev/gun";
import * as Canvas from './canvas.js';
import * as Nodes from "./nodes.js";
import * as UNSET from "https://cdn.jsdelivr.net/npm/gun/lib/unset.js";

export {Peer}

class Peer {
    constructor(id) {
        this.gun = GUN()
        this.id = id
        this.node = this.gun.get(id).put({ name: id, subscriptions: "empty", changes : "empty", canvas : Canvas.initializeCanvas() })
        this.changes = []
    }

    print(){
        console.log("id: ")
        console.log(this.node.get('id'))
        Nodes.printNode(this.node)
    }

    subscribe(id){
        console.log("subbing " + id)
        let new_subscription = this.gun.get(id)
        this.node.get('subscriptions').set(new_subscription)
        //console.log(this.node.get('subscriptions').once(function(item){console.log(item)}))
        
        var a = []
        a.push("a")
        this.node.get('subscriptions').map().once(function(item, key){ // print them back out
            a.push(item)
        });
        console.log(a)

        this.node.get('subscriptions').unset(new_subscription)
        var b = []
        this.node.get('subscriptions').map().once(function(item, key){ // print them back out
            a.push(item)
        });
        console.log(b)

        return
    }
    unsubscribe(id){
        console.log("unsubbing " + id)
        this.node.get('subscriptions').unset(this.gun.get(id))
        
        this.node.get('subscriptions').map(function(item){
            console.log(item)
        })
    }
}

