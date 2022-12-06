import GUN from "https://cdn.skypack.dev/gun";
import * as Canvas from './canvas.js';
import * as Nodes from "./nodes.js";
import * as UNSET from "https://cdn.jsdelivr.net/npm/gun/lib/unset.js"

export {Peer}

class Peer {
    constructor(id) {
        this.gun = GUN()
        this.id = id
        this.node = this.gun.get(id).put({ name: id, subscriptions: "empty", changes : "empty", canvas : Canvas.initializeCanvas() })
        this.changes = []
    }

    print(){
        //console.log("printing " + node)
        this.node.map((item, key) => { // print them back out
        console.log("key: " + key);
        console.log("item: " + item)
    });
    }

    subscribe(id){
        console.log("subbing " + id)
        let new_subscription = this.gun.get(id)
        this.node.get('subscriptions').set(new_subscription)
        //console.log(this.node.get('subscriptions').once(function(item){console.log(item)}))
        return
    }
    unsubscribe(id){
        console.log("unsubbing " + id)
        let subscription = this.gun.get(id)

        this.node.get('subscriptions').unset(subscription)
    }
}

