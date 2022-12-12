const express = require('express');

router.get('/data/:userID', async (req, res) => {
    try {
        if(req.params.userID === 'undefined'){
            res.status(500).json({ message : 'No userID provided'});
        }
        else{
            // read all data from gun at userID and send it back
        }
    }
    catch (err){
        res.status(500).json({ message : err.message })
    }
})

router.post('/data/', async (req, res) => {
    const data = {
        id : "test",
        post : "testData",
        timestamp : Date.now()
    };

    // Add data to GUN
}