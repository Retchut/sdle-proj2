import GUN from "https://cdn.skypack.dev/gun";
import { initializeCanvas, updateCanvas } from './canvas.js';

const gun = GUN();

// TODO: move into function called from html
let canvas = initializeCanvas();
const subscriptions = gun.get('subscriptions');
const localChanges = gun.get('localChanges'); // changes on this node's canvas
const localName = 'AAA'; // this node id
const thisnode = gun.get(localName).put({ id: localName, changes : localChanges})
console.log('all ok')

const subscribeNode = (nodeName) => {
    // TODO: check if node exists

    // TODO: get external node
    const nodeChanges = []; // replace this with getting all changes from remote node

    // changes array = [ { timestamp : timestamp, char : char, start : start, end : end} ]
    const newSubscription = gun.get(nodeName).put({id : nodeName, changes : []});

    // TODO: update canvas with all of nodeName's history
    for(change of nodeChanges){
        localChanges.set(change);
        updateCanvas(canvas, change);
    }

    // set up subscription
    newSubscription.on((message) => updateCanvas(canvas, message));

    // add new subscription to the local array of nodes we are subscribed to
    subscriptions.set(newSubscription);
}