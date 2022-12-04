import Canvas from "../Canvas/Canvas";
import DrawForm from "../DrawForm/DrawForm";
import SubscribeForm from "../SubscribeForm/SubscribeForm";

export default function Node(props){
    const id = props.nodeData.id;
    const subscriptions = props.nodeData.subscriptions;

    const getSubscriptionText = (subscriptions) => {
        let text = "";
        Object.keys(subscriptions).forEach((key) => text += (" " + subscriptions[key]))
        return text;
    }

    return (
        <div id={id} className="col-6 d-flex flex-column p-4">
            <div className="row">
                <h3 className="w-auto">{id}</h3>
                <h3 className="w-auto">Subscribed to:{getSubscriptionText(subscriptions)}</h3>
            </div>
            <div className="row flex-grow-1">
                <div className="col-4">
                    <div className="row">
                        <SubscribeForm id={id} subscriptions={subscriptions} />
                    </div>
                    <div className="row">
                        <DrawForm id={id} subscriptions={subscriptions} />
                    </div>
                </div>
                <div className="col-8">
                    <div className="h-100 d-flex justify-content-center">
                        <Canvas id={id} canvas={props.nodeData.canvas} />
                    </div>
                </div>
            </div>
        </div>
    );
}