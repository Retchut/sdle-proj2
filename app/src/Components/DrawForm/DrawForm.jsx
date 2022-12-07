import { useState } from "react";
import { updateNode } from "../../ProtocolLogic/nodes";

export default function DrawForm(props){
    const nodeID = props.id;
    const subscriptions = props.subscriptions;

    const [input, setInput] = useState({ char : '', xStart : 0, xEnd : 0, yStart : 0, yEnd : 0 });

    const submitForm = (e) => {
        e.preventDefault();
        // TODO: create change object and send it to updateNode
        const change = {
            timestamp : 0,
            char : input.char,
            start : '' + input.xStart + "," + input.yStart,
            end : '' + input.xEnd + "," + input.yEnd,
        }
        const response = updateNode(props.gun, nodeID, change);
        // TODO: check if response is positive or negative, and show something on screen depending on that
    }

    return (
        <form className="w-100" onSubmit={submitForm}>
            <h3>Draw a line:</h3>
            <div className="row">
                <div className="col">
                    <label className="form-label" htmlFor="x-start-input">Start x:</label>
                    <input type="text" className="form-control" id="x-start-input" value={input.xStart} onChange={(e) => setInput({...input, xStart : parseInt(e.target.value)})}/>
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="y-start-input">Start y:</label>
                    <input type="text" className="form-control" id="y-start-input" value={input.yStart} onChange={(e) => setInput({...input, yStart : parseInt(e.target.value)})}/>
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="char-input">Character:</label>
                    <input type="text" className="form-control" id="char-input" value={input.char} onChange={(e) => setInput({...input, char : e.target.value})}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label" htmlFor="x-end-input">End x:</label>
                    <input type="text" className="form-control" id="x-end-input" value={input.xEnd} onChange={(e) => setInput({...input, xEnd : parseInt(e.target.value)})}/>
                    </div>
                <div className="col">
                    <label className="form-label" htmlFor="y-end-input">End y:</label>
                    <input type="text" className="form-control" id="y-end-input" value={input.yEnd} onChange={(e) => setInput({...input, yEnd : parseInt(e.target.value)})}/>
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <input type="submit" className="h-50 my-2 btn-secondary" value="Draw" />
                </div>
            </div>
        </form>
    )
}