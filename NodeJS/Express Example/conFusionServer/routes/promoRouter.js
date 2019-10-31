// This is also a node module..

const express = require('express');
const bodyParser = require('body-parser');


const promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());


promotionsRouter.route('/')

/* we dont need app.all anymore we chain that into the route
 */
// Here we are chaning the remaining methods.
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});



promotionsRouter.get('/:promoId', (req,res,next) => {
	res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
});

promotionsRouter.post('/:promoId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/' + req.params.promoId);
});

promotionsRouter.put('/:promoId', (req, res, next) => {

	res.write('Updating the promotion: ' + req.params.promoId + '\n');

  res.end('Will update the promotion: ' + req.body.name +
		' with details: ' + req.body.description);
});

promotionsRouter.delete('/:promoId', (req, res, next) => {
	res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports = promotionsRouter;
