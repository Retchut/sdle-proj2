/**
 * Subscribes a node to another node
 * @param {string} subscriber       Node that will perform the subscription
 * @param {string} nodeToSubscribe  Node the subscriber will subscribe to
 */
 const subscribeNode = (subscriber, nodeToSubscribe) => {
    // TODO: check if node exists

    // TODO: get external node
    const subscriberNode = gun.get(subscriber);
    const newSubscriptionNode = gun.get(nodeToSubscribe);
    subscribeNode.get('subscriptions').set(nodeToSubscribe);

    // TODO: update canvas with all of nodeName's history
    for(change of nodeChanges){
        // change = { timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' }
        subscriberNode.get('changes').set(change);
        subscriberNode.get('canvas').put(updateCanvas(subscribeNode.get('canvas'), change));
    }

    // set up subscription
    newSubscriptionNode.on((change) => updateNode(subscriber, change));

    // add new subscription to the local array of nodes we are subscribed to
    subscriptions.set(newSubscriptionNode);
}

/**
 * Updates a subscriber with the change passed as argument
 * @param {string} subscriber   id of the node to update
 * @param {object} change       changes to update the node with
 */
const updateNode = (subscriber, change) => {
    const subscriberNode = gun.get(subscriber);
    // { timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' }
    subscriberNode.get('changes').set(change);
    subscriberNode.get('canvas').put(updateCanvas(subscribeNode.get('canvas'), change));
}

const printNode = (node) => {
    node.map((item, key) => { // print them back out
        console.log(key);
    });
}

export { subscribeNode, updateNode, printNode };
