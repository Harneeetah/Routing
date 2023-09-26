const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|index(.html)?', (req, res) => {
    // using (^/$|)- this ensures the address must have a '/' or end with index.html
    //using (.html)?- this makes adding .html optional in the web address
    // one method to direct the server to the file 
    //res.sendFile('./webviews/index.html', {root: __dirname});
    // An alternative to this is
    res.sendFile(path.join(__dirname,'..', 'webviews','index.html'));
});

router.get('/newpage(.html)?', (req, res) => {
     res.sendFile(path.join(__dirname, '..', 'webviews','newpage.html'));
});

router.get('/oldpage(.html)?', (req, res) => {
    // redirecting an oldpage to newpage
    res.redirect( 301,'newpage.html');
});

module.exports = router;