const express = require('express'),
	http = require('http');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;
const app = express ();



const dishRouter = require('./routes/dishRouter');
// Mounting our Endpoint, any request coming to /dishes endpoint will be handled by dishRouter.
app.use('/dishes', dishRouter);

const leaderRouter = require('./routes/leaderRouter');
app.use('/leaders', leaderRouter);

const promotionsRouter = require('./routes/promoRouter');
app.use('/promotions', promotionsRouter);


// Bodyparser
// parses the information from the body of the message.
app.use(bodyParser.json());

  // Morgan logging.
app.use(morgan('dev'));


// Express...
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
	console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
