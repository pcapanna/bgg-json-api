var express = require('express');
var router = express.Router();
var options = require('../utils/bgg-options');
var bgg = require('bgg')(options);
var createError = require('http-errors');
var HttpStatus = require('http-status-codes');

function routerFn(req, res) {
    console.log(req.url);
    bgg(req.url, req.query)
        .then(function (result) {
            if (result.error) {
                console.log(result.error);
                var statusText = result.error.message;
                var statusCode = HttpStatus.getStatusCode(statusText);
                res.status(statusCode).send(statusText);
            } else {
                res.send(result);
            }
        }).catch(function (e) {
            res.status(400).send(HttpStatus.getStatusText(400));
        }
    );
}

router.get('/thing', routerFn);
router.get('/family', routerFn);
router.get('/forumlist', routerFn);
router.get('/forum', routerFn);
router.get('/thread', routerFn);
router.get('/user', routerFn);
router.get('/guild', routerFn);
router.get('/plays', routerFn);
router.get('/collection', routerFn);
router.get('/hot', routerFn);
router.get('/search', routerFn);


module.exports = router;
