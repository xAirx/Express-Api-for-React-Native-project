var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');
var Leaders = require('../models/leaders');
var LeaderRouter = express.Router();
LeaderRouter.use(bodyParser.json());
var cors = require('../routes/cors');

LeaderRouter.route('/')
    /* .options(cors.corsWithOptions,authenticate.verifyAdmin, (req, res) => { res.sendStatus(200); }) */
    .get(cors.cors, /* authenticate.verifyUser, */ (req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                /* res.json(leaders); */
                res.json({status: "Grabbed Leader Success", leaders});

            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Leader Created ', leaders);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                /* res.json(leaders); */
                res.json({status: "Post Leader Success", leaders});
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DEL operation not supported on /leaders');
    });

LeaderRouter.route('/:leaderId')
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

        Leaders.findById(req.params.leaderId)
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
               /*  res.json(leaders); */
               res.json({status: "Grabbed Leader Success", leaders});
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
               /*  res.json(leaders); */
                res.json({status: "Update  Leader Success", leaders});

            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "Delete Leader Success", resp});
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = LeaderRouter;