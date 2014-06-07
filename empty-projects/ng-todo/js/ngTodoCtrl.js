ngTodo.controller('NgTodoCtrl', function NgTodoCtrl($scope) {

  $scope.todos = [
    { val: "Make a sweet app", completed: false },
    { val: "Make a sweeter app", completed: true },
    { val: "Make a sweetest app", completed: true },
    { val: "Make a sweeterest app", completed: false },
    { val: "Make a sweetestestest app", completed: true }
  ];

  $scope.addNewTask = function() {
    $scope.todos.push({ completed: false, val: $scope.newTask });
    $scope.newTask = '';
  };

  $scope.clearCompleted = function() {
    $scope.todos = $scope.todos.filter(function(el) {
      return !el.completed;
    });
  };

});