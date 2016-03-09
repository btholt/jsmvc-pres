ngTodo.controller('NgTodoCtrl', function NgTodoCtrl($scope) {
	$scope.todos = [
		{ val: "Get job", completed: false},
		{ val: "Learn MEAN", completed: false},
		{ val: "Sleep early", completed: false},
		{ val: "Interview for internship", completed: true},
		{ val: "Pack for trip", completed: false}
	];

	$scope.addNewTask = function() {
		$scope.todos.unshift({ completed: false, val: $scope.newTask });
		$scope.newTask = '';
	};

	$scope.clearCompleted = function() {
		$scope.todos = $scope.todos.filter(function(el, index) {
			return !el.completed;
		});
	};

	$scope.removeTodo = function(index) {
		$scope.todos.splice(index, 1);
	};
});