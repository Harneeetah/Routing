const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler.js');
const PORT = process.env.PORT || 3000 ;


//creating a custom middleware for logging
app.use(logger);

//Cross origin resource sharing
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//There are built-in middleware.
app.use(express.urlencoded({extended : false}));

// built-in middleware for json files
app.use(express.json());

//built-in middleware for handling static files
 app.use('/',express.static(path.join(__dirname, '/public')));
 app.use('/subdir', express.static(path.join(__dirname, '/public')));

 app.use('/', require('./routes/root'));
 app.use('/subdir', require('./routes/subdir'));
 app.use('/employees', require('./routes/api/employees'))

 //handles all requests to web address
 app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));