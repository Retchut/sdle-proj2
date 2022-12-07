import GUN from "https://cdn.skypack.dev/gun";
import * as Canvas from './canvas.js';
import * as Nodes from "./nodes.js";

export {Peer}

class Peer {
    constructor(id) {
        this.gun = GUN()
        this.id = id
        this.node = this.gun.get(id).put({ name: id, subscriptions: "empty", changes : "empty", canvas : Canvas.initializeCanvas() })
        this.changes = []
    }

    print(print_canvas=false){
        let id = this.id
        console.log("printing " + this.id)
        var canvas_printed = false
        this.node.map((item, key) => { // print them back out
            if (key == "subscriptions"){
                this.node.get('subscriptions').map().once(function(item, key){
                    if (item != null){
                        console.log("subscribed to: " + item.name)
                    }
                });
            }else if(key == "canvas" && print_canvas && !canvas_printed){
                this.node.get('canvas').map().once(function(item, key) {
                    console.log(id + " canvas " + key, item)
                })
                canvas_printed = true
            }
            else {
                console.log("key: " + key);
                console.log("item: " + item)
            }
        });
    }

       /**
     * Subscribes this.node from id
     * @param {string} id id of the node to subscribe to
     */
    subscribe(id){
        console.log("subbing " + id)
        let new_subscription = this.gun.get(id)
        this.node.get('subscriptions').set(new_subscription)
        //console.log(this.node.get('subscriptions').once(function(item){console.log(item)}))

    }
       /**
     * Unsubscribes this.node from id
     * @param {string} id id of the node to unsubscribe to
     */
    unsubscribe(id){
        console.log("unsubbing " + id)
        let subscription = this.gun.get(id)

        //this.node.get('subscriptions').unset(subscription)
        this.node.get("subscriptions").put({ [id]: null })
    }

        /**
     * Adds change to this node changes
     * @param {object} change  change to update the node with
     */
    addChange (change) {
        // { timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' }
        this.node.get('changes').set(change);
        console.log("change: ", change)
        this.node.get('canvas').put(Canvas.updateCanvas(this.node.get('canvas'), change));
    }
}

