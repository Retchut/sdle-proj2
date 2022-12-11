const express = require('express');
const Gun = require('gun');
const app = express();

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
    
const server = app.listen(id, () => {
    console.log(`Gun listening at http://localhost:${id}/gun`)
    let gun = Gun({
        localStorage : false,
        radisk : false,
        web : server,
        peers: peers
    });
    
    const name = process.argv[3]
    gun.put({ name : "empty" })
    
    let sleep = function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    
    var counter = 0
    const fun = async () => {
        console.log(counter)
        gun.get(name).map().once( async (item) => {
            console.log(item)
        })
        await sleep(1000)
        fun()
    }
    
    //fun()
})