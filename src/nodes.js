/**
 * Subscribes a node to another node
 * @param {string} subscriber       Node that will perform the subscription
 * @param {string} nodeToSubscribe  Node the subscriber will subscribe to
 */
 const subscribeNode = (gun, subscriber, nodeToSubscribe) => {
    // TODO: check if node exists

    // TODO: get external node
    const subscriberNode = gun.get(subscriber);
    const newSubscriptionNode = gun.get(nodeToSubscribe);
    subscriberNode.get('subscriptions').set(nodeToSubscribe);

    // TODO: update canvas with all of nodeName's history
    const nodeChanges = newSubscriptionNode.get('changes');
    for(const change of nodeChanges){
        // change = { timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' }
        updateNode(subscriber, change)

        //subscriberNode.get('changes').set(change);
        //subscriberNode.get('canvas').put(updateCanvas(subscribeNode.get('canvas'), change));
    }

    // set up subscription
    newSubscriptionNode.on((change) => updateNode(subscriber, change));

    // add new subscription to the local array of nodes we are subscribed to
    subscriptions.set(newSubscriptionNode);
}

/**
 * Updates a subscriber with the change passed as argument
 * @param {string} subscriber   id of the node to update
 * @param {object} change       change to update the node with
 */
const updateNode = (gun, subscriber, change) => {
    const subscriberNode = gun.get(subscriber);
    // { timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' }
    subscriberNode.get('changes').set(change);
    subscriberNode.get('canvas').put(updateCanvas(subscribeNode.get('canvas'), change));
}

const printNode = (node) => {
    //console.log("printing " + node)
    node.map((item, key) => { // print them back out
        console.log("key: " + key);
        console.log("item: " + item)
    });
}

export { subscribeNode, updateNode, printNode };
