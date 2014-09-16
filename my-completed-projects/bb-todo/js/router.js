window.TodoApp = new (Backbone.Router.extend({
    routes: {'': 'index'},
    initialize: function() {
        this.todoItems = new TodoItems();
        this.todosView = new TodosView({
            collection: this.todoItems
        });
        this.todosView.render();

        $('.btn-clear').click(function() {
            window.TodoApp.todosView.filterCompleted();
        });

        $('.btn-success').click( function() {
            if ($('#newTodo').val() === "") {
                return;
            }
            window.TodoApp.todoItems.add({
                val: $('#newTodo').val(),
                completed: false
            });
            $('#newTodo').val('');
        });
    },
    index: function() {
        var fixtures = [
            {val: "Make a sweet app", completed: false},
            {val: "Make a sweet app", completed: false},
            {val: "Make a sweet app", completed: false},
            {val: "Make a sweet app", completed: false},
            {val: "Make a sweet app", completed: false},
            {val: "Make a sweet app", completed: false},
            {val: "Stuff", completed: true},
            {val: "Things", completed: true}
        ];

        $('#app').html(this.todosView.el);
        this.todoItems.reset(fixtures);
    },
    start: function() {
        Backbone.history.start();
    }
}));
