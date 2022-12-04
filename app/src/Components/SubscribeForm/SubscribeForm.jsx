import { useState } from "react";
import { subscribeNode } from "../../ProtocolLogic/nodes";

export default function SubscribeForm(props){
    const nodeID = props.id;
    const subscriptions = props.subscriptions;

    const [newSubscribeName, setNewSubscribeName] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        const response = subscribeNode(props.gun, nodeID, newSubscribeName);
        // TODO: check if response is positive or negative, and show something on screen depending on that
    }

    return (
        <form className="w-50" onSubmit={submitForm}>
            <label className="form-label" htmlFor="node-id-input">Subscribe to a new node:</label>
            <input
            type="text"
            className="form-control"
            id="node-id-input"
            value={newSubscribeName}
            onChange={(e) => setNewSubscribeName(e.target.value)}
            />
            <input type="submit" className="my-2 btn-secondary" value="Search" />
        </form>
    )
}