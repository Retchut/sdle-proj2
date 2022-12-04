import Canvas from "./Canvas";

export default function Node(props){
    const id = props.nodeData.id;
    const subscriptions = props.nodeData.subscriptions;

    const getSubscriptionText = (subscriptions) => {
        let text = "";
        Object.keys(subscriptions).forEach((key) => text += (" " + subscriptions[key]))
        return text;
    }

    return (
        <div id={id} className="col-6 p-4">
            <h3>ID: {id}</h3>
            <h3>Subscribed to:{getSubscriptionText(subscriptions)}</h3>
            <h3>Draw:</h3>
            <div className="w-100 d-flex justify-content-center">
                <Canvas id={id} canvas={props.nodeData.canvas} />
            </div>
        </div>
    );
}