const express = require('express');
const Gun = require('gun');
const app = express();

if(process.argv[2] === undefined){
    console.log("id undefined")
    process.exit(1);
}

const id = 9000 + Number(process.argv[2]);      // where our server is

if(id < 9000 || id > 9999){
    console.log(`Port ${id} is reserved`);
    process.exit(1);
}

let peers = []
if(process.argv[3] !== undefined){
    const peerID = 9000 + Number(process.argv[3]);
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
})

let gun = Gun({
    localStorage : false,
    radisk : false,
    web : server,
    peers: peers
});

gun.get("Test").on(async(data) => {
console.log(data)
})










// app.use(Gun.serve);

// const server = app.listen(id, () => {
//     console.log(`Gun listening at http://localhost:${id}/gun`)
// })

// if (process.argv.length <= 3){
//     Gun({
//         web : server,
//     });
// }else{
//     console.log("Server: Connecting to peer " + peer)
//     Gun({
//         web : server,
//         peers: [`http://localhost:${peer}/gun`]
//     });
// }