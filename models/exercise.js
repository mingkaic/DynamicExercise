var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
	title : {
		type : String,
		required : "please enter exercise name"
	},
	targetArea : {
		type : String,
		required : "please enter exercise target"
	},
	note : {
		type : String
	},
	created : {
		type : Date,
		default : Date.now
	}
}, {versionKey: false});

var Exercise = mongoose.model('exercise', exerciseSchema);

module.exports = {
	Exercise: Exercise
};