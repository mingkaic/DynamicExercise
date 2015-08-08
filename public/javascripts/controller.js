(function (){

var myApp = angular.module('myApp', []);

myApp.controller('controller', ['$scope', '$http', function($scope, $http) {

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

		$http.get('/exercise/targetArea').success(function(response) {
			$scope.targets = ['all'];

			for (i=0; i<response.length; i++) {
				$scope.targets.push(response[i]._id);
			}
		});
	};

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
		var display = $('#target').val();

		if (!display || display==='all') {
			refresh();
		} else {
			var criteria = JSON.stringify({targetArea: display});

			$http.get('/'+criteria).success(function(response) {
				$scope.exerciseList = response;
			});
		}
	};
}]);

})();