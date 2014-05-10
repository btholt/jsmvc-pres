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
    });

  },
  index: function() {
    var fixtures = [
      {val: 'Learn Backbone.js', completed:true},
      {val: 'Look at cat pictures', completed: true},
      {val: 'Also, puppies', completed: false},
      {val: 'Choose an MVC', completed: false},
      {val: 'Hear some rad presenters', completed: true}
    ];
    $('#app').html(this.todosView.el);
    this.todoItems.reset(fixtures);
  },
  start: function() {
    Backbone.history.start();
  }
}));