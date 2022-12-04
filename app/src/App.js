import 'bootstrap/dist/css/bootstrap.min.css';
import { drawCanvas } from './canvas';
import Node from './Components/Node/Node.jsx';

function App() {
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
    { id : 'bob', subscriptions : { 0 : "test3", 1 : "test4" }, changes : {}, canvas : emptycanvas },
    { id : 'josh', subscriptions : { 0 : "test3", 1 : "test4" }, changes : {}, canvas : emptycanvas },
    { id : 'andy', subscriptions : { 0 : "test3", 1 : "test4" }, changes : {}, canvas : emptycanvas },
    { id : 'josh', subscriptions : { 0 : "test3", 1 : "test4" }, changes : {}, canvas : emptycanvas },
    { id : 'andy', subscriptions : { 0 : "test3", 1 : "test4" }, changes : {}, canvas : emptycanvas }
  ]

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
