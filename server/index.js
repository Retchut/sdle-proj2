const express = require('express');
const Gun = require('gun');
const app = express();
const port = 9000;

app.use(Gun.serve);

const server = app.listen(port, () => {
    console.log(`Gun listening at http://localhost:${port}`)
})

Gun({
    localStorage : false,
    web : server
});