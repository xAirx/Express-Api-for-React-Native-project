// This is also a node module..

const express = require('express');
const bodyParser = require('body-parser');

/*
An Express router defines many Express application,
and within that many Express application,
you can, for example,
deal with one particular REST API endpoint in more detail,
or one particular pattern of REST API endpoint in more detail.
So, for example, we can define a dishRouter as express.Router,
and then the dishRouter can then handle the endpoints. */

// declare dishrouter as an express router()
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());



dishRouter.route('/')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

////////////////// Endpoints with ID /////////////////////////


dishRouter.get('/:dishId', (req,res,next) => {
	res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

dishRouter.post('/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

dishRouter.put('/:dishId', (req, res, next) => {

	res.write('Updating the dish: ' + req.params.dishId + '\n');

  res.end('Will update the dish: ' + req.body.name +
		' with details: ' + req.body.description);
});

dishRouter.delete('/:dishId', (req, res, next) => {
	res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishRouter;
