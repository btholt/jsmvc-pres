ngTodo.controller('NgTodoCtrl', function NgTodoCtrl() {
  this.todos = [
    { val: 'Make a sweet app.', completed: false },
    { val: 'Present the talk.', completed: false },
    { val: 'Learn Angular.', completed: true },
    { val: 'Do cool things.', completed: true },
    { val: 'Another goal.', completed: false }
  ];

  this.addNewTask = function() {
    this.todos.unshift({ completed: false, val: this.newTask });
    this.newTask = '';
  };

  this.clearCompleted = function() {
    this.todos = this.todos.filter(function(el) {
      return !el.completed;
    });
  }

  this.deleteTodo = function(index) {
    this.todos.splice(index,1);
  }
});