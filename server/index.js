const express = require('express');
const Gun = require('gun');
const app = express();
const id = 9000 + Number(process.argv[2]);
const peer = 9000 + Number(process.argv[3]);

app.use(Gun.serve);

const server = app.listen(id, () => {
    console.log(`Gun listening at http://localhost:${id}/gun`)
})

if (process.argv.length <= 3){
    Gun({
        localStorage: false,
        web : server,
    });
}else{
    console.log("Server: Connecting to peer " + peer)
    Gun({
        localStorage: false,
        web: server,
        peers: [
            `http://localhost:${peer}/gun`
        ]
    });
}