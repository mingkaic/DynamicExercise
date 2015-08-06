(function (){

var myApp = angular.module('myApp', []);

myApp.controller('controller', ['$scope', '$http', function($scope, $http) {

	$scope.targets = ['all', 'bicep', 'tricep', 'chest'];

	var clear = function() {
		$scope.exercise = {
			_id: "",
			title: "",
			targetArea: "",
			note: "",
			created: ""
		};
	};

	var refresh = function() {
		$http.get('/exercise').success(function(response) {
			$scope.exerciseList = response;
		});
	};

	var filter = function() {
		$http.get('/exercise/targetArea').success(function(response) {
			console.log(response);
		});
	};

	filter();
	refresh();
	clear();

	$scope.addExercise = function() {
		$http.post('/', $scope.exercise).success(function(response) {
			if (response) console.log(response);
			refresh();
		});
		clear();
	};

	$scope.removeExercise = function(id) {
		$http.delete('/' + id).success(function(response) {
			if (response) console.log(response);
			refresh();
		});
	};

	$scope.editExercise = function(id) {
		var criteria = JSON.stringify({_id: id});

		$http.get('/' + criteria).success(function(response) {
			$scope.exercise = response[0];
		});
	};

	$scope.update = function() {
		$http.put('/' + $scope.exercise._id, $scope.exercise).success(function(response) {
			if (response) console.log(response);
			refresh();
		});
		clear();
	};

	$scope.search = function() {
		console.log($('#target').val());
	};
}]);

})();