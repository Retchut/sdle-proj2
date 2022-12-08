import 'bootstrap/dist/css/bootstrap.min.css';
import Node from './Components/Node/Node.jsx';
import * as Canvas from './ProtocolLogic/canvas.js';
import * as Peer from "./ProtocolLogic/Peer.js";

function App() {        
    // TODO: replace this with loading code from gun
    const emptycanvas = {
        0 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        1 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        2 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        3 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        4 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        5 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        6 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        7 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        8 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
        9 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'}
    }

    const nodes = [
        { id : 'alice', subscriptions : { 0 : "test1", 1 : "test2" }, changes : {}, canvas : emptycanvas },
        { id : 'bob', subscriptions : { 0 : "test3", 1 : "test4" }, changes : {}, canvas : emptycanvas }
    ]
    // -------------------------------

    const getNodeRows = (nodes) => {
        let nodeArrays = [];
        const colNum = 2;
        
        for(let i = 0; i < nodes.length; i++){
            if(i % colNum === 0){
            nodeArrays.push([nodes[i]]);
            }
            else{
            nodeArrays[Math.floor(i/colNum)].push(nodes[i]);
            }
        }
        
        return nodeArrays;
    }
    

    localStorage.clear()

    var node1 = new Peer.Peer("node_1")
    var node2 = new Peer.Peer("node_2")

    //node2.print(false)

    node2.subscribe("node_1")
    console.log("Printing")
    node1.addChange({ timestamp: 1000, start : "0,0", end : "1,1" })
    
    //node1.print()
    //Canvas.updateCanvas(node1.node.get('canvas'))

    return (
        <div className="vw-100 vh-100 m-0 overflow-auto">
        {getNodeRows(nodes).map(row => {
            return (
            <div className="row m-0 h-50">
                {row.map(node => <Node nodeData={node} />)}
            </div>
            )
        })}
        </div>
    );
}

export default App;
