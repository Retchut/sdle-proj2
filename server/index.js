const express = require('express');
const Gun = require('gun');
const app = express();
const WebSocket = require('ws');
const { Buffer } = require('buffer');

// -------------- Setup ------------------
if(process.argv[2] === undefined){
    console.log("id undefined")
    process.exit(1);
}
if(process.argv[3] === undefined){
    console.log("name undefined")
    process.exit(1)
}

const id = 9000 + Number(process.argv[2]);
if(id < 9000 || id > 9999){
    console.log(`Port ${id} is reserved`);
    process.exit(1);
}

let peers = []
if(process.argv[4] !== undefined){
    const peerID = 9000 + Number(process.argv[4]);
    if(peerID < 9000 || peerID > 9999){
        console.log(`Peer port ${id} is reserved`);
        process.exit(1);
    }
    
    if(peerID === id){
        console.log("Peer can't have the same id as this process");
        process.exit(1)
    }

    peers.push(`http://localhost:${peerID}/gun`)
}
// ---------------------------------------

// initialize gun
var gun;

// ------------- Websocket ---------------
const socketPort = 4000 + Number(process.argv[2]);
const clientName = process.argv[3]

const wsServer = new WebSocket.Server({ port : socketPort });
wsServer.on('connection', socket => {
    socket.on('message', (message) => {
        message = JSON.parse(message.toString());
        
        if(message.operation === 'post'){
            gun.get(clientName).get("posts").set(message.data);
            socket.send(JSON.stringify(message.data));
        }
        else if(message.operation === 'subscribe'){
            const subscriptionPosts = gun.get(message.data).get("posts");
            subscriptionPosts.map().once(newPost => {
                socket.send(JSON.stringify(newPost))
            })
        }
        else{
            console.log(`Unsupported operation: ${message.operation}`);
        }
    })
})
// ---------------------------------------

// ----- Connect and start server --------
const server = app.listen(id, () => {
    console.log(`Gun listening at http://localhost:${id}/gun`)
    gun = Gun({
        localStorage : false,
        radisk : false,
        web : server,
        peers: peers
    });
    
    gun.put({ name : "empty" })
    gun.get(clientName).put({ posts : "empty", subscriptions : "empty" })
    
    let sleep = function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    
    var counter = 0
    const fun = async () => {
        console.log(counter)
        counter++;
        gun.get(clientName).get("posts").map().once( async (item) => {
            console.log(item)
        })
        await sleep(1000)
        fun()
    }
    
    // fun()
})
// ---------------------------------------