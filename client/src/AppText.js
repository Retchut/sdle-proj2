import { useState, useEffect, useReducer } from 'react';
import Gun from 'gun';
import 'bootstrap/dist/css/bootstrap.min.css';
import Node from './Components/Node/Node.jsx';

const gun = Gun({
  localStorage : false,
  peers : [
    `http://localhost:${process.env.REACT_APP_GUN_PORT}/gun`
  ]
})

const initialState = { messages : [] };

function reducer(state, line) {
  return {
    messages : [line, ...state.messages]
  }
}

function App() {

  const [formInput, setFormInput] = useState({
    name : '', message : ''
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const messages = gun.get('messages');
    messages.map().once(message => {
      dispatch({
        name : message.name,
        message : message.message,
        timestamp : message.timestamp
      })
    })
  }, []);

  function onChange(e) {
    setFormInput({...formInput, [e.target.name] : e.target.value })
  }
  
  function saveMessage() {
    const messages = gun.get('messages');
    messages.set({
      name : formInput.name,
      message : formInput.message,
      timestamp : Date.now()
    })
    setFormInput({
      name : '', message : ''
    })
  }

  return (
    <div style={{ padding: 30 }}>
      <input
        onChange={onChange}
        placeholder="Name"
        name="name"
        value={formInput.name}
      />
      <input
        onChange={onChange}
        placeholder="Message"
        name="message"
        value={formInput.message}
      />
      <button onClick={saveMessage}>Send Message</button>
      {
        state.messages.map(message => (
          <div key={message.timestamp}>
            <h2>{message.message}</h2>
            <h3>From: {message.name}</h3>
            <p>Date: {message.timestamp}</p>
          </div>
        ))
      }
    </div>
  )

  // // TODO: replace this with loading code from gun
  // const emptycanvas = {
  //   0 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   1 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   2 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   3 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   4 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   5 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   6 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   7 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   8 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'},
  //   9 : {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0',7:'0',8:'0',9:'0'}
  // }

  // const nodes = [
  //   { id : 'alice', subscriptions : { 0 : "test1", 1 : "test2" }, changes : {}, canvas : emptycanvas },
  //   { id : 'bob', subscriptions : { 0 : "test3", 1 : "test4" }, changes : {}, canvas : emptycanvas }
  // ]
  // // -------------------------------

  // const getNodeRows = (nodes) => {
  //   let nodeArrays = [];
  //   const colNum = 2;
    
  //   for(let i = 0; i < nodes.length; i++){
  //       if(i % colNum === 0){
  //         nodeArrays.push([nodes[i]]);
  //       }
  //       else{
  //         nodeArrays[Math.floor(i/colNum)].push(nodes[i]);
  //       }
  //   }
    
  //   return nodeArrays;
  // }

  // return (
  //   <div className="vw-100 vh-100 m-0 overflow-auto">
  //     {getNodeRows(nodes).map(row => {
  //       return (
  //         <div className="row m-0 h-50">
  //           {row.map(node => <Node nodeData={node} />)}
  //         </div>
  //       )
  //     })}
  //   </div>
  // );
}

export default App;
