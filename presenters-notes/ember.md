# Ember

## Step 1 - Bootstrapping

### app.js

```javascript

window.Todos = Ember.Applcation.create();

```

- Creating our application and attaching it to the window object. The essential first step to any Ember app.

### router.js

```javascript

Todos.Router.map(function() {
  this.resource('todos', {path: '/'});
});

Todos.TodosRoute = Ember.Route.extend({

});

```

- The Ember router is an essential (and awesome) part to any Ember app. Unlike Angular, the Ember router must be instantiated, even if you have only one route.
- This is a good time to discuss a big part of the Ember philosophy: convention over configuration. By calling your resource `todos`, Ember goes behind the scenes and instantiated `TodosRoute`, `TodosController`, and assumes your template will be called `todos`. You'll see this philosophy throughout Ember: Ember assumes that you want to write good code and thus it just cuts out these "wiring-up" steps. Personal editorial: once you understand what's going on, it's awesome. It cuts out a lot of boilerplate. It sucks for beginners though. Not being explicit and hiding that wiring up makes Ember a bit tougher to approach.
- But yeah, you see that TodosRoute? It's automagically wired to the todos route. Pretty sweet. Right now we're not going to do anything with it but we'll come back. If you don't need to configure the route, you don't need to instantiate it. Ember does that for you.

### models.js

```javascript

Todos.Todo = DS.Model.extend({
  val: DS.attr('string'),
  completed: DS.attr('boolean')
});

```

- Ember requires schema for its models. The DS is the Ember Data business; it helps you manage your data (and in my opinion is inseparable from Ember; you should use both.)
- This helps, as any typing system does, catch bugs early.

### controller.js

```javascript

Todos.TodoController = Ember.ObjectController.extend({
  actions: {

  }
});

```

- We're now defining the controller for the Todo objects. We've also added an action object (again, not necessary if you don't need it; we will need it here in a sec.) Nothing too special here.

```javascript

Todos.TodosController = Ember.ArrayController.extend({
  actions: {

  }
});

```

- Similar to the code above but this is a collection of Todos or an Array, as Ember calls them.
- We're instantiating that same actions object which we'll use in a second.

### app.js

```javascript

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

```

- This is telling the app where to grab its data; in this case, we're telling it we're going to providing with local, mock data.
- This mock data is in the `fixtures.js` file. Feel free to gander at it if you're curious; we're not going to go over it because it's just supplying mock data.
- One of Ember's really cool features is its idea of Adapters. It's absolutely trivial to swap out a local data set (which is what the `FixtureAdapter` does) for an API. If you're going back and forth between local and remote data, this is a huge win. It's one line change to switch data sources.

### router.js

```javascript

Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

```

- We need to tell Ember that the todo models are necessary on this route and to load them up.
- Note that we don't specify remote or local. It just does a `find` command. All we had to do is switch the adapter and this logic works without changes. Good call, Ember team.

### components.js

```javascript

Todos.TodoEntryComponent = Ember.Component.extend({
  actions: {

  }
});

```

- Defining a component that we're about to use. Components are sorta like web compoents; they're designed to reusable pieces of markup. We'll use one to represent each todo.

### index.js

```html

<script type="text/x-handlebars" data-template-name="todos">

{{#each itemController="todo"}}
  {{todo-entry val=val completed=completed}}
{{/each}}

</script>

```

- This is handlebars. Ember depends on it.
- The script tag identifies to Ember where your handlebars templating goes. Your templates don't have to be inlined like it is here. It's done here for simplicity.
- The `#each` is how you loop over an array, in this case the Array `todo`.
- We've identified a todo-entry, which is a component we have yet to define. We're passing the component the `val` and the `completed` properties so it can render it properly.

```html

<script type="text/x-handlebars" id="components/todo-entry">
  <div class="input-group input-group-lg">
    <span class="input-group-addon">
      {{input type="checkbox" checked=completed}}
    </span>

    {{input value=val classNameBindings=":form-control completed:finished"}}
    <span class="input-group-btn">
      <button class="btn btn-danger" type="button">
        <i class="glyphicon glyphicon-remove"></i>
      </button>
    </span>
  </div>
</script>

```

- Lots happening here. The id is significant. You're letting Ember this corresponds to the `TodoEntryComponent`.
- the `{{input ... }}` thing is a Handlebars construct. It's helper specifically for inputs. The `checked=completed` is a two-way data binding between the checkbox's value and the completed value on the model, as is the `value=val` on the other input.
- The `classNameBindings=":form-control completed:finished"` is letting Ember know what classes it needs to add. The : prefixed one is always applied (you can't mix `classNameBindings` and `class` syntax) and the `completed:finished` is only applied if `completed` is `true`.
- Let's try it now. It should display our fixtures and the checkboxes should conditionally apply styles.

### components.js

```javascript
Todos.TodoEntryComponent = Ember.Component.extend({
  actions: {
    click: function() {
      this.sendAction('remove');
    }
  }
});
```

- Let's add the ability to remove. First we need to make the button work. We'll define a `click` function. This name is arbitrary.
- That's what `actions` objects are for: responding to user input.
- We're going to then pass this input on to the ArrayController which will handle the actual removal.

### index.html

```html
{{todo-entry val=val completed=completed remove="removeTodo"}}

...

<button class="btn btn-danger" type="button" {{action "click" }}>
  <i class="glyphicon glyphicon-remove"></i>
</button>

```

- The first bit we're wiring up what a `remove` action means (which we use with `this.sendAction('remove')`.)
- The second bit adding the action via Handlebars to the button so that that function will get run each time that button is clicked. Let's go define that function.


### controllers.js

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

- Here we're adding that `removeTodo` function. The `deleteRecord` and `save` are all Ember Data and baked in. It happens at the adapter level so if you had an API behind this, it would get called here.
- The remove should now work. Let's try.

### index.html

```html
{{input class="form-control" type="text" id="new-todo" placeholder="New Todo" value=newTodo action="createNewTodo"}}
<span class="input-group-btn">
  <button class="btn btn-success" type="button" {{action "createNewTodo"}}>
    <i class="glyphicon glyphicon-plus"></i>
  </button>
</span>
```

- Using the same input Handlebars helper.
- Added two-way data binding to the newTodo value.
- Added an action just in case they hit enter.
- Also added the same action to the button.

### controllers.js

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
    }
  }
});

```

- Creating a new todo. Use `.get()` (a common paradigm in Ember,) to get the value of the newTodo.
- Create a new record and save.
- Let's try it.

### index.html

```html

<div class="btn-clear-group">
  <button {{action "clearCompleted"}} class="btn btn-primary btn-clear">Clear Completed</button>
</div>

```

- Just adding an action

### controllers.js

```javascript

Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    [...]
    clearCompleted: function() {
      var completed = this.filterBy('completed', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  }
});

```

- The `invoke` function is fun. It goes through and calls a function on each record. Both `deleteRecord` and `save` are baked-in functions to Ember Data.
- Let's try it.

---

Below is the older version of my notes. Runs through the material more quickly as it goes page-by-page instead of function-by-function.

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



- Just adding a base route in here. Unlike Angular, Ember has the router baked into the core of it and it's not very feasible to write Ember without the router (as opposed to Angular, which you can write without the router quite easily.)
- This is pretty demonstrative of how Ember works: it's pretty prescribed. They've made it pretty tough to write bad Ember code. While some may shun this approach, I believe it has a lot of merit. A lot my early Angular code is pretty bad because I didn't quite understand best practices yet. Ember will force to bang your head against it until it makes you give it best practices. This is great for teams with junior devs as well because they are forced in following Ember best practices.
- The this.store.find() will go into whatever adapter it's connected to (in our case, just hardcoded. Otherwise it'd probably make an AJAX request to a server.)


## models.js

```javascript

Todos.Todo = DS.Model.extend({
  val: DS.attr('string'),
  completed: DS.attr('boolean')
});

```

## fixtures.js

```javascript

Todos.Todo.FIXTURES = [
 {
   id: 1,
   val: 'Learn Ember.js',
   completed: true
 },
 {
   id: 2,
   val: 'Banana for Scale',
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

## index.html

```handlebars

<script type="text/x-handlebars" data-template-name="todos">
</script>

```

- This how Ember knows where to go template. Kinda fun, right?

```handlebars

{{input class="form-control" type="text" id="new-todo" placeholder="New Todo" value=newTodo action="createNewTodo"}}

```

- Simple helper function that comes that cool two-way dataBinding
- The action tells it what to do if it's "submitted," or in this case if you hit enter on it. It'll call the createNewTodo function which we'll code in a sec.
- The value is how it knows which variable it's two-way binding to.

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

{{#each itemController="todo"}}
{{/each}}


```

- Like the ng-repeat directive. This will loop over your collection of todos and create an element for it.
- Changes the context to be the individual items.

```handlebars

{{input type="checkbox" checked=completed}}

```

- Another input helper. Will be checked based on the item's completed property.

```handlebars

{{input value=val classNameBindings=":form-control completed:finished"}}

```

- Conditional classes. Prefix with just a colon and always get that class. Prefix it with a JavaScript variable and it'll change add/remove the class based on the truthiness of the variable.
- The input value will be based on val.
- You can't mix classNameBindings and class. Use the prefixed colon syntax to always have the class.

```handlebars

<button class="btn btn-danger" type="button" {{action "removeTodo"}}>

```

- Bind the removeTodo method to the button click. This will be called at the collection level.

```handlebars

<button {{action "clearCompleted"}} class="btn btn-primary btn-clear">Clear Completed</button>

```

- Free adding of executing a JavaScript function when interacted with. Amazing, right? No more event listeners! (or very few.)