const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');
const PromoRouter = express.Router()
PromoRouter.use(bodyParser.json());
const authenticate = require('../authenticate')
var cors = require('../routes/cors');

PromoRouter.route('/')
    /* .options(cors.cors, (req, res) => { res.sendStatus(200); }) */
    .get(cors.cors, (req, res, next) => {
        Promotions.find({})
            .then((Promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
/*                 res.json(Promotions);
 */                res.json({status: "Grab Promo Success", promotion});
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.create(req.body)
            .then((promotion) => {
                console.log('promotion Created ', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
               /*  res.json(promotion); */
                res.json({status: "Post Promo Success", promotion});

            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Promotions');
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
                res.json({status: "Delete Promo Success", resp});

            }, (err) => next(err))
            .catch((err) => next(err));

    });
PromoRouter.route('/:promotionId')
    /* .options(cors.cors, (req, res) => { res.sendStatus(200); }) */
    .get(cors.cors, (req, res, next) => {
        Promotions.findById(req.params.promotionId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
/*                 res.json(promotion);
 */                res.json({status: "Grab Promo Success", promotion});
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Promotions/' + req.params.promotionId);
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, { new: true })
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
/*                 res.json(promotion);
 */                res.json({status: "Update Promo Success", resp});

            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promotionId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
/*                 res.json(resp);
 */                res.json({status: "Delete Promo Success", resp});

            }, (err) => next(err))
            .catch((err) => next(err));
    });

//// promotion ID COMMENTS

module.exports = PromoRouter;