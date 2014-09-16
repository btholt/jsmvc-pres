Todos.Router.map(function () {
    this.resource('todos', { path: "/" });
});

// TodosRoute based on above resource.
Todos.TodosRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('todo');
    }
});
