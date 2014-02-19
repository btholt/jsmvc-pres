window.TodoApp = new (Backbone.Router.extend({
  routes: {'':'index'},
  initialize: function() {
    this.todoItems = new TodoItems();
    this.todosView = new TodosView({collection: this.todoItems});
    this.todosView.render();

    $('.btn-success').click(function() {
      window.TodoApp.todoItems.add({val:$("#newTodo").val(), completed: false});
      $("#newTodo").val('');
    });

    $('.btn-clear').click(function() {
      window.TodoApp.todosView.filterCompleted();
    })

  },
  index: function() {
    $('#app').html(this.todosView.el);
    this.todoItems.reset([
      {val: 'Learn Backbone.js', completed:true},
      {val: 'Look at cat pictures', completed: true},
      {val: 'Also, puppies', completed: false},
      {val: 'Choose an MVC', completed: false},
      {val: 'Hear some rad presenters', completed: true}
    ]);
  },
  start: function() {
    Backbone.history.start();
  }
}));