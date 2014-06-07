ngTodo.controller('NgTodoCtrl', function NgTodoCtrl($scope) {
  $scope.todos = [
    { val: 'Make a sweet app.', completed: false },
    { val: 'Present the talk.', completed: false },
    { val: 'Learn Angular.', completed: true },
    { val: 'Do cool things.', completed: true },
    { val: 'Another goal.', completed: false }
  ];

  $scope.addNewTask = function() {
    $scope.todos.unshift({ completed: false, val: $scope.newTask });
    $scope.newTask = '';
  };

  $scope.clearCompleted = function() {
    $scope.todos = $scope.todos.filter(function(el) {
      return !el.completed;
    });
  }

  $scope.deleteTodo = function(index) {
    $scope.todos.splice(index,1);
  }
});