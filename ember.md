# Ember

## app.js

```javascript

window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

```

- Pretty simple. You see us here making our app and attaching it the global object. This will be the only thing we'll attach the global object. Think of it as the namespace.
- Ember has a pretty sweet feature where it makes really easy to switch from mock data to real data. We're going to use fixtures which is just mock data. It's a snap to swap a backend in or out for local testing as well as writing unit and end-to-end tests.


## router.js

```javscript

Todos.Router.map(function() {
  this.resource('todos', { path: '/' });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

```



- Just adding a base route in here. Unlike Angular, Ember has the router baked into the core of it and it's not very feasible to write Ember without the router (as opposed to Angular, which you can write without the router.)
- The this.store.find() will go into whatever adapter it's connected to (in our case, just hardcoded. Otherwise it'd probably make an AJAX request to a server.)


## models.js

```javascript

Todos.Todo = DS.Model.extend({
  val: DS.attr('string'),
  completed: DS.attr('boolean')
});

Todos.Todo.FIXTURES = [
 {
   id: 1,
   val: 'Learn Ember.js',
   completed: true
 },
 {
   id: 2,
   val: 'Fluent Conf',
   completed: false
 },
 {
   id: 3,
   val: 'Puppies',
   completed: false
 },
 {
  id: 4,
  val: 'Duck sized horse',
  completed: true
 },
 {
  id: 5,
  val: 'Horse-sized duck',
  completed: false
 }
];

```

- The top part is all you would need in production. The bottom part is just some mock data and would be taken out before going to production. As such, you can see the models can be fairly simple. As with these other frameworks, any time you're operating on data, you want to make your models fatter and keep your controllers skinny.
- To change how it from loading local fixtures to loading from a server or local storage, you can just change the adapter. By default, it looks a lot like Backbone's URL structure. You can change and customize that.

## controllers.js

```javascript

Todos.TodoController = Ember.ObjectController.extend({
  actions: {
    removeTodo: function() {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }
  }
});

```

- Ember Data has a lot of built in functionality like save, update, and delete. As such, we're just going to leverage those. Thus really the only thing we need to code up is what happens when the delete buttons gets coded.
- We don't need to code up the binding between the value in the DOM input and the Ember model. This is part of Ember's core: two-way data binding. If it changes on the DOM, it changes in the JS model and vice versa. This is a powerful feature and saves tons of time. It one of the greatest strength of both Angular and Ember.
- **Using the console, demonstrate how the data stays the same if you change it either in the console or the input.**

```javascript

Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createNewTodo: function() {
      var newVal = this.get('newTodo');
      var todo = this.store.createRecord('todo', {
        val: newVal,
        completed: false
      });
      this.set('newTodo', '');
      todo.save();
    },
    clearCompleted: function() {
      var completed = this.filterBy('completed', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  }
});

```

- Now that we have a controller for the TodoController, let's make one for the TodosController, the group of TodoControllers. Again, this controller has a bunch of cool features built into; we just need to code what's unique to us.
- We're just setting the input to be an empty string after that.
- We're just filtering out with the clearComplete and then invoking functions on each one of the records. This is in turn can fire an API that will update and perpetuate the data.


## index.html

```handlebars

{{input class="form-control" type="text" id="new-todo" placeholder="New Todo" value=newTodo action="createNewTodo"}}

```

- Simple helper function that comes that cool two-way dataBinding

```handlebars

{{input value=val classNameBindings=":form-control completed:finished"}}

```

- Conditional classes. Prefix with just a colon and always get that class. Prefix it with a JavaScript variable and it'll change add/remove the class based on the truthiness of the variable.

```handlebars

<button {{action "clearCompleted"}} class="btn btn-primary btn-clear">Clear Completed</button>

```

- Free adding of executing a JavaScript function when interacted with. Amazing, right? No more event listeners! (or very few.)