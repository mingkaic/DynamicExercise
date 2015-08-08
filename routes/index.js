var express = require('express');
var router = express.Router();
var exerciseService = require('../services/exercise_service.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	return res.render('index', { title: 'DynamicExercises' });
});

// refresher
router.get('/exercise', function(req, res, next) {
	exerciseService.findAll(function(err, docs) {
		if (err) return res.json(err);
		res.json(docs);
	});
});

// add data
router.post('/', function(req, res, next) {
	exerciseService.addExercise(req.body, function(err, docs) {
		if (err) res.json(err);
	});

	res.json(null);
});

// remove exercise
router.delete('/:id', function(req, res, next) {
	var id = req.params.id;

	exerciseService.removeExercise(id, function(err) {
		if (err) return res.json(err);
	});
	res.json(null);
});

// edit of search data
router.get('/:data', function(req, res, next) {
	var criteria = JSON.parse(req.params.data);
	exerciseService.findExercise(criteria, function(err, docs) {
		if (err) return res.json(err);
		res.json(docs);
	});
});

// update data
router.put('/:id', function(req, res, next) {
	exerciseService.changeExercise(req, function(err) {
		if (err) return res.json(err);
	});
	res.json(null);
});

// obtain all existing targetAreas
router.get('/exercise/targetArea', function(req, res, next) {
	// count the targetAreas in the database via aggregation
	exerciseService.aggregate({}, {_id: '$targetArea'}, function(err, docs) {
		if (err) return res.json(err);
		res.json(docs);
	});
});

module.exports = router;
