var mongojs = require('mongojs');
var Exercise = require('../models/exercise').Exercise;

exports.findAll = function(next) {
	Exercise.find({}, function(err, docs) {
		next(err, docs);
	});
};

exports.addExercise = function(exercise, next) {
	var newExercise = new Exercise({
		title : exercise.title,
		targetArea : exercise.targetArea,
		note : exercise.note
	});

	newExercise.save(function(err) {
		if (err) return next(err);
		next(null);
	});
};

exports.removeExercise = function(exerciseid, next) {
	Exercise.remove({_id: mongojs.ObjectId(exerciseid)}, function(err) {
		if (err) return next(err);
		next(null);
	});
};

exports.changeExercise = function(req, next) {
	var id = mongojs.ObjectId(req.params.id);
	var exercise = req.body;
	
	Exercise.update({_id: id}, {
		title : exercise.title,
		targetArea : exercise.targetArea,
		note : exercise.note
	}, function(err, numberAffected, rawResponse) {
		next(err);
	});
};

exports.findExercise = function(criteria, next) {
	Exercise.find(criteria, function(err, docs) {
		next(err, docs);
	});
};

exports.aggregate = function(match, group, next) {
	var EAgg = Exercise.aggregate([
			{$match: { }},
			{$group: { targetArea: '$targetArea' }}
		]);
	console.log(EAgg);
	EAgg.toArray(function(err, docs) {
		console.log(err);
		next(err, docs);
	});
};