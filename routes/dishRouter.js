const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/dishes');
const authenticate = require('../authenticate');
const DishRouter = express.Router();
var cors = require('../routes/cors');

DishRouter.use(bodyParser.json());


DishRouter.route('/')
   /*  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); }) */
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Dishes.find({})

            /*   dishes find and we will say after this, populate.
              So, we are using the population support in mongoose
              and we'll say populate comments author.
              So, by stating this,
              we are saying when
              the dishes document has been constructed to send back the reply to the user,
              we're going to populate the author field inside there from the user document in there.
              So, this call to the populate will ensure that
              the other field will be populated with the information as required. */

            .populate('comments.author')
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })


    /*     This says that if a post request comes in,
    I would first execute this middleware,
    which I have exported from the authentic.js file,
    I first apply that,
    which is equivalent to saying passport authenticate JWT and you are checking the user.
    Then if this is successful,
    then I will move on to do the rest of it.
    If the authentication fails at this point,
    then passport authenticate will reply
    back to the client with the appropriate error message. */
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log('Dish Created ', dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        })
        .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /dishes');
        })
        .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            Dishes.remove({})
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
        });



module.exports = DishRouter;