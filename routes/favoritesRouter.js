var express = require('express');
var bodyParser = require('body-parser');
var Favorites = require('../models/favorites');
var authenticate = require('../authenticate');
var cors = require('./cors');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
 /*  .options(cors.cors, (req, res) => { res.sendStatus(200); }) */
  .get(cors.cors, /* authenticate.verifyUser, */ (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate('user')
      .populate('dishes')
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
       /*  res.json(favorites); */
        res.json({status: "Grab favorite Success",favorites});
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          for (var i = 0; i < req.body.length; i++) {
            if (favorite.dishes.indexOf(req.body[i]._id) === -1) {
              favorite.dishes.push(req.body[i]._id);
            }
          }
          favorite.save()
            .then((favorite) => {
              console.log('Favorite Created ', favorite);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({status: "saved favorite Success",favorite});
            }, (err) => next(err));
        }
        else {
          Favorites.create({ "user": req.user._id, "dishes": req.body })
            .then((favorite) => {
              console.log('Favorite Created ', favorite);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({status: "created favorite Success",favorite});
            }, (err) => next(err));
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
  })
  .delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndRemove({ "user": req.user._id })
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: "Delete favorite Success",resp});
      }, (err) => next(err))
      .catch((err) => next(err));
  });

favoriteRouter.route('/:dishId')
  .options(cors.cors, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/' + req.params.dishId);
  })


  .post(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          if (favorite.dishes.indexOf(req.params.dishId) === -1) {
            favorite.dishes.push(req.params.dishId)
            favorite.save()
              .then((favorite) => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "post favorite Success", favorite});
              }, (err) => next(err))
          }
        }
        else {
          Favorites.create({ "user": req.user._id, "dishes": [req.params.dishId] })
            .then((favorite) => {
              console.log('Favorite Created ', favorite);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({status: "Post favorite Success", favorite});
            }, (err) => next(err))
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })

  .put(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/' + req.params.dishId);
  })

  .delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          index = favorite.dishes.indexOf(req.params.dishId);
          if (index >= 0) {
            favorite.dishes.splice(index, 1);
            favorite.save()
              .then((favorite) => {
                console.log('Favorite Deleted ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "delete favorite Success",favorite});
              }, (err) => next(err));
          }
          else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          }
        }
        else {
          err = new Error('Favorites not found');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  });


module.exports = favoriteRouter;