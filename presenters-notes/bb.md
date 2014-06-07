# Backbone

## router.js

```javascript

window.TodoApp = new(Backbone.Router.extend({

}));

```

- Pretty straight forward. We're instantiating a new Backbone router which is the heart of the app.
- You can make new class and then instantiate it but I prefer to wrap it in an IIFE because you would never instantiate a router twice (or at least I haven't encountered a use case yet.)

```javascript

routes: {'' : 'index'},
initialize: function() {

},
index: function() {
  var fixtures = [
    {val: 'Learn Backbone.js', completed:true},
    {val: 'Look at cat pictures', completed: true},
    {val: 'Also, puppies', completed: false},
    {val: 'Choose an MVC', completed: false},
    {val: 'Hear some rad presenters', completed: true}
  ];
},
start: function() {
  Backbone.history.start();
}

```

- We need to define a route even if we aren't going to be routing. The empty string route is the default one. You would define other routes here and their controllers if you had more.
- `initialize` is the function that is called as the router is being initialized. It is only called once.
- `start` essentially starts the app. It's not reserved word; just a common pracice. We'll call here in a sec. This starts Backbone tracking the app's routes via HTML push states (though we don't use it in this; it's just common practice.)
- `index` is the only route we're using. It's the controller.

## app.js

```javascript

$(function(){ TodoApp.start() });

```

- Starting the app routing once it has loaded. Give it its own context.

## models.js

```javascript

window.TodoItem = Backbone.Model.extend({});

```

- Creating a model. Why? Why not just make it a normal JS object? Backbone objects come with some cool features like `save`, `delete`, and other baked in event firing stuff that's easy to key off of. We'll be adding a method later too.
- Notice it doesn't have a schema (like Angular and unlike Ember.) There are Backbone extensions that enforce schema if you like that.

```javascript

window.TodoItems = Backbone.Collection.extend({
  model: TodoItem
});

```

- Creating a collection. This is essentially an array in Backbone terms: a group of models.
- The `model` property just tells it which model it is a collection of.

## views.js

```javascript

window.TodoView = Backbone.View.extend({
  template: _.template('<span class="input-group-addon"><input <%= completed ? "checked=checked" : "" %> type="checkbox"></span><input value="<%= val %>" class="form-control<%= completed ? " finished" : "" %>" type="text"><span class="input-group-btn"><button class="btn btn-danger" type="button"><i class="glyphicon glyphicon-remove"></i></button></span>'),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  className: 'input-group input-group-lg'
});

```

- Okay, WTF is this. This is how a model *looks*. The model is where the data is stored and manipulated; the view is how the model is presented visually. This is a good time to talk about why a fat model and a skinny controller are good things. You can have one model be represented by many different views. You can also have other, external things manipulating your data that is not just in your view. You could also potentially have a model that is not being visually represented but still needs to be updated. In all these cases you would want to instantiate a model without a view and thus you don't want to have to instantiate a view just to manipulate data.
- The template is just underscore templating. We could pass any html in here. We could write a templating function ourselves or use Mustache, Handlebars, Underscore... you get the idea.
- The render function is the keystone to the view. The $el is a shortcut to the this.el wrapped in jQuery and the html is just being set by template function.
- The `className` get assigned to the parent.

```javascript

window.TodosView = Backbone.View.extend({

  addOne: function(todoItem){
    var todoView = new TodoView({model: todoItem});
    this.$el.append(todoView.render().el);
  },

  addAll: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },

  render: function(){
    this.addAll()
    return this;
  }

});

```

- Likewise, this is the view for the collection as a whole. Anything that interacts with the collection as a whole goes through this. The views essentially serve two purposes: to dispatch with all the user interaction to the correct model to handle the correct manipulation of data and to render the data itself to the page. **No data modification should be done at the model level.**
- This `addOne`, `addAll`, and `render` paradigm isn't required in Backbone apps but is very common.
- `addOne` adds just one new model the collection. This can be useful for adding new models or just rendering a whole new collection all together.
- `addAll` is useful for adding a whole set of items to the collection. This is useful for the reset behavior I'm about to show you.
- The `render` method just calls `addAll` and returns itself because that's the expected behavior for `render`.

## router.js

```javascript

//initialize
this.todoItems = new TodoItems();
this.todosView = new TodosView({collection: this.todoItems});
this.todosView.render();


//index
$('#app').html(this.todosView.el);
this.todoItems.reset(fixtures);

```

- We need to instantiaite the first versions of our todoItems and todosView and render it for the first time.
- Cool. Now we just attach the HTML to the DOM, load some element in there (reset just takes in data to a collection.) and let her rip!
- Oh wait, we didn't handle the reset event.

## views.js

```javascript

initialize: function(){
  this.collection.on('add', this.addOne, this);
  this.collection.on('reset', this.addAll, this);
  this.collection.on('destroy', this.render, this);
},

```

- Let's just do up all the events.
- This is why we split all those methods out.
- This is just like a jQuery event listener. We're putting event listeners and then calling the correct methods with the correct context.
- Notice the events are happening on the model, not the view.
- Cool! Now it renders! Now we're done, right? Wrong! Unfortunately, two-way data binding in Backbone is not free like it is in Ember and Angular. We have to go wire up all the messaging (AKA event listening) that handles all the updates, creates, and deletes. Let's do an easy one: `filterCompleted`.

## models.js

```javascript

  filterCompleted: function() {
    this.remove(this.filter(function(item) {
      return item.get('completed');
    }));
  }

```

## views.js

```javascript

filterCompleted: function() {
  this.collection.filterCompleted();
  this.render();
}

```

## router.js

```

$('.btn-clear').click(function() {
  window.TodoApp.todosView.filterCompleted();
});

```

- First we need the data manipulation needs to happen on the model. You're going to be tempted to handle this on the view: DON'T. It helps if you do the code on the model first and then move on to the view.
- In the view, just call the releveant model method and re-render (again, Backbone doesn't know when to re-render.)
- What? jQuery event listeners!? Yup. Backbone has nothing for handling events outside its components and the button itself is not a component so we need to handle with an external listener. Feel free to write vanilla JS but since jQuery is a dependency of Backbone you might as well use it. Okay, let's do `toggle`.

## models.js

```javascript

toggle: function() {
  this.set('completed', !this.get('completed'));
}

```

## views.js

```javascript
events: {
  'change input[type=checkbox]' : 'toggle'
},
initialize: function(){
  this.model.on('change', this.render, this);
},
toggle: function() {
  this.model.toggle();
}
```

- First we set up this in the model. I've seen some people argue that this is unnecessary and that set is an equally viable method to call from the view. I disagree because it means you have to refactor later if that toggle method has to do other things on your model. Your call.
- In the view, we can use the events object for some shorthand stuff. The first word in the key is the type of event. There's a bunch of them (check out the Backbone docs) but we'll be using change here and click later. The second part of the key is the jQuery flavored selector of where that event is happening. In this case, it's any checkboxes in our todo. It'll call the value with the event as the parameter. Let's do adding a new task.
- We're also setting an event listener on the model. This way whenever the underlying model has data change it knows it has to re-render.

## router.js

```javascript

$('.btn-success').click(function() {
  window.TodoApp.todoItems.add({val:$("#newTodo").val(), completed: false});
  $("#newTodo").val('');
});

```

- That's it. We're just leveraing the wiring to that it uses to render itself. Pretty slick, right? You'll find this happening a lot in Backbone. While two-way data binding isn't free, once it's been implemented, it's essentially now free to you. Just be able to recognize when you have convergent logic. Let's add the ability to update tasks.

## views.js

```javascript

//events
'change .form-control' : 'update',

update: function() {
  this.model.updateText(this.$('.form-control').val());
},

```

## models.js

```javascript

updateText: function(text) {
  this.set('val', text);
}

```

- Pretty straight forward. Grab the text from the text area. The `this.$()`, as you might expect, selects from only in that DOM tree of that component. Let's do the last bit, deleting a component.

## views.js

```javascript

//events
'click .btn-danger' : 'remove'

remove: function(){
  this.model.destroy();
},

```

## models.js

```javascript

initialize: function(){
  this.on('destroy', this.removeElement, this);
},

removeElement: function(model){
  this.remove(model);
},

```

=====

// This is the old explanation.
// It goes over the code instead of live coding it.

## router.js

- The heart of the Backbone heart. You're get set up all your local routing here

### routes: {'':'index'},

- Defining your own routes. Here we only have one. The empty string is represents the base URL route.

### initialize

- We can set up some jQuery like event listeners for things outside the app that effect here. Hence the button listeners.

### index

- The function that is run when the app is set up. You could some AJAX to request initial date here; I'm just hard coding some start values (I always fear losing Internet during a presentation.)

### start

- The function that starts your browser history going and ultimately the app.

## app.js

$(function(){ TodoApp.start() });

- Just starts the app! That's it! If you needed more boilerplate to go along with your app when it's initialized, you could certainly put it here.

## models.js

- Big, big key here for Backbone for having sane apps. Think fat models and skinny views. It is everyone's biggest temptation to stick everything in the view. Only presentational type functionality should exist on the view. Everything else should be stuck on the model. Your model should full of functions that manipulate and massage the data in such a way that your view can render it nicely.

### toggle

- Simple little function to toggle the completed state on the Todo list. These are the function that should live in the model. You're manipulating data. It's a huge temptation to manipulate this from the view.


### model vs collection

- Notice the first is extending a model (an individual object of whatever you're doing) and the second is extending a collection of the models from the first object.

### initialize

- This is where you want to set up all your event listeners for you model. An event is going to be fired from the view on your model. Again, hate to reiterate too much, but it's pretty tempting just to handle this from the view. However, your code will maintain a more concise and easier to maintain codebase if the view remains pretty dumb and only does rendering-type activities. Anyway, here we're listening for remove events that will then, in turn, destroy the model and remove it from the collection.

### url

- Not using it in this app, but I left this in to show the functionality. It's very easy to fire off AJAX calls from Backbone. Every time a model/collection gets CRUD'd in some way, it's easy to perpetuate that to an API endpoint. There is where you'd set the base URL for it. It would then use the ID that you set on the object as a parameter and would send that data up to the server

## views.js

### template

- Cool part about Backbone here: it's agnostic to templating. I just stuck with Underscore because it's already a requirement for Backbone but you could use Handlebars, Mustache, or even write your own. As long it's returning HTML, you can do it.

### events

- First part is the jQuery-flavored selector. The second part is the function it is going to call. Think of this as a very cool and concise way to set up event listeners.
- The functions will be called from the view.

### functions

- Notice all the functions are simply messing with the rendering. None of it's actually changing date.
- Notice I have to call the render function when I want the DOM to update. Two-way data binding is not free in Backbone (out of the box) like it is in Ember and Angular. Every time your data is changing (and you expect that to change the view in some way) you need to make sure you're rendering. The idiomatic way (as far as I know) is how I did it here.
- Notice in initialize that you can actually bind to your own custom events

### addAll and addOne

- This is also some idiomatic Backbone. (you don't have to do it this way.) The render does want to do an addAll once it's called but it can also be called in other situations. For that reason we've split the two out. The addOne is the same idea. We want to be able addOne (as we'll do from the router) from other places besides just the addAll function. As such, we've split it out.

## Finally

- Backbone is rad. It allows for very granular level control of what's going on. It doesn't have expensive $digest cycles or anything else, but when talking in comparison to Ember and Angular, it's pretty feature barren (though there's a healthy ecosystem of associated libraries.)
- In my opinion, if you plan on building a large and heavily-client side app in JS, Backbone is a really great option. There's some upfront debt to getting the models and views set-up, but they typically only need to be written once and then they're pretty straightforward to maintain.
- Backbone is only as useful as how strict you are in organizing it. It can go from being a huge time-saver to an even bigger time-sink if you are careless in the separation of concerns. It becomes a game of "Where the **** did Bob feel like writing that code?"
- Lots of good Backbone developers out there. A big advantage to using is that it already has a pretty good mindshare.
