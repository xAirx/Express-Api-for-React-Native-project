const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');
const authenticate = require('../authenticate');
const DishRouter = express.Router();
var cors = require('cors')

DishRouter.use(bodyParser.json());


DishRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
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
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log('Dish Created ', dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
        .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /dishes');
        })
        .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            Dishes.remove({})
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
        });


        DishRouter.route('/:dishId')
            .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
            .get(cors.cors, (req, res, next) => {
                Dishes.findById(req.params.dishId)

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
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(dish);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            })

            .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

                res.statusCode = 403;
                res.end('POST operation not supported on /dishes/' + req.params.dishId);
            })
            .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
                Dishes.findByIdAndUpdate(req.params.dishId, {
                    $set: req.body
                }, { new: true })
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(dish);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            })
            .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
                Dishes.findByIdAndRemove(req.params.dishId)
                    .then((resp) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(resp);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            });

        //// DISH ID COMMENTS


        DishRouter.route('/:dishId/comments')
            .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
            .get(cors.cors, (req, res, next) => {
                Dishes.findById(req.params.dishId)
                    .populate('comments.author')
                    .then((dish) => {
                        if (dish != null) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish.comments);
                        }
                        else {
                            err = new Error('Dish ' + req.params.dishId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
            })
            .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

                Dishes.findById(req.params.dishId)
                    .then((dish) => {
                        if (dish != null) {

                            /*            Recall that the body contains the comment already,
                   but the author property will not be there in the body of the message in the book,
                   but depending on which user is posting this information,
                   we can immediately populate the author field.
                   Now, how do we know which user is posting this information?
                   The fact that we have done the verify user here for the post,
                   means that a specific user is posting this information,
                   and by doing the verify user,
                   we would have already loaded in the req.user into the request object.
                   In the request object,
                   we can go in and say wreck user,
                   and then underscore ID here. */

                            req.body.author = req.user._id;
                            dish.comments.push(req.body);
                            dish.save()
                                .then((dish) => {
                                    Dishes.findById(dish._id)
                                        .populate('comments.author')
                                        .then((dish) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(dish);
                                        })
                                }, (err) => next(err));
                        }
                        else {
                            err = new Error('Dish ' + req.params.dishId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
            })

            .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

                res.statusCode = 403;
                res.end('PUT operation not supported on /dishes/'
                    + req.params.dishId + '/comments');
            })
            .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
                Dishes.findById(req.params.dishId)
                    .then((dish) => {
                        if (dish != null) {
                            for (var i = (dish.comments.length - 1); i >= 0; i--) {
                                dish.comments.id(dish.comments[i]._id).remove();
                            }
                            dish.save()
                                .then((dish) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(dish);
                                }, (err) => next(err));
                        }
                        else {
                            err = new Error('Dish ' + req.params.dishId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
            });


        /*    Allow a registered user to submit comments (already completed),
           update a submitted comment and delete a submitted comment.
           The user should be restricted to perform such operations only on his/her own comments.
           No user or even the Admin can edit or delete the comments submitted by other users. */
        DishRouter.route('/:dishId/comments/:commentId')
            .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
            .get(cors.cors, (req, res, next) => {
                Dishes.findById(req.params.dishId)
                    .populate('comments.author')
                    .then((dish) => {
                        if (dish != null && dish.comments.id(req.params.commentId) != null
                            && dish.comments.id(req.params.commentId).author.equals(req.user._id)) {

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish.comments.id(req.params.commentId));
                        }
                        else if (dish == null) {
                            err = new Error('Dish ' + req.params.dishId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                        else if (dish.comments.id(req.params.commentId) == null) {
                            err = new Error('Comment ' + req.params.commentId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                        else {
                            err = new Error('You are not authorized to update this comment!');
                            err.status = 403;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
            })
            .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
                res.statusCode = 403;
                res.end('POST operation not supported on /dishes/' + req.params.dishId
                    + '/comments/' + req.params.commentId);
            })
            .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

                Dishes.findById(req.params.dishId)
                    .then((dish) => {
                /*                 Allow a registered user to submit comments
(already completed), update a submitted comment and delete a
submitted comment. The user should be restricted to
perform such operations only on his/her own comments.
No user or even the Admin can edit or delete the comments
 submitted by other users.
 */                if (dish != null && dish.comments.id(req.params.commentId) != null
                            && dish.comments.id(req.params.commentId).author.equals(req.user._id)) {
                            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            if (req.body.rating) {
                                dish.comments.id(req.params.commentId).rating = req.body.rating;
                            }
                            if (req.body.comment) {
                                dish.comments.id(req.params.commentId).comment = req.body.comment;
                            }
                            dish.save()
                                .then((dish) => {
                                    Dishes.findById(dish._id)
                                        .populate('comments.author')
                                        .then((dish) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(dish);
                                        })
                                }, (err) => next(err));
                        }
                        else if (dish == null) {
                            err = new Error('Dish ' + req.params.dishId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                        else if (dish.comments.id(req.params.commentId) == null) {
                            err = new Error('Comment ' + req.params.commentId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                        else {
                            err = new Error('you are not authorized to delete this comment!');
                            err.status = 403;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
            })
            .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
                Dishes.findById(req.params.dishId)
                    .then((dish) => {

/*                 Allow a registered user to submit comments
(already completed), update a submitted comment and delete a
submitted comment. The user should be restricted to
perform such operations only on his/her own comments.
No user or even the Admin can edit or delete the comments
 submitted by other users.
 */                if (dish != null && dish.comments.id(req.params.commentId) != null
                            && dish.comments.id(req.params.commentId).author.equals(req.user._id)) {

                            dish.comments.id(req.params.commentId).remove();
                            dish.save()
                                .then((dish) => {
                                    Dishes.findById(dish._id)
                                        .populate('comments.author')
                                        .then((dish) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(dish);
                                        })
                                }, (err) => next(err));
                        }
                        else if (dish == null) {
                            err = new Error('Dish ' + req.params.dishId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                        else if (dish.comments.id(req.params.commentId) == null) {
                            err = new Error('Comment ' + req.params.commentId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                        else {
                            err = new Error('you are not authorized to delete this comment!');
                            err.status = 403;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
            });

        module.exports = DishRouter;