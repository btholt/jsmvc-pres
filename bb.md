# Backbone

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
// TODO take the set out of update and put in the model.
- Notice I have to call the render function when I want the DOM to update. Two-way data binding is not free in Backbone (out of the box) like it is in Ember and Angular. Every time your data is changing (and you expect that to change the view in some way) you need to make sure you're rendering. The idiomatic way (as far as I know) is how I did it here.
- Notice in initialize that you can actually bind to your own custom events

### addAll and addOne

- This is also some idiomatic Backbone. (you don't have to do it this way.) The render does want to do an addAll once it's called but it can also be called in other situations. For that reason we've split the two out. The addOne is the same idea. We want to be able addOne (as we'll do from the router) from other places besides just the addAll function. As such, we've split it out.

// TODO put filterCompleted into the the collections model.

## Finally

- Backbone is rad. It allows for very granular level control of what's going on. It doesn't have expensive $digest cycles or anything else, but when talking in comparison to Ember and Angular, it's pretty feature barren (though there's a healthy ecosystem of associated libraries.)
- In my opinion, if you plan on building a large and heavily-client side app in JS, Backbone is a really great option. There's some upfront debt to getting the models and views set-up, but they typically only need to be written once and then they're pretty straightforward to maintain.
- Backbone is only as useful as how strict you are in organizing it. It can go from being a huge time-saver to an even bigger time-sink if you are careless in the separation of concerns. It becomes a game of "Where the **** did Bob feel like writing that code?"
- Lots of good Backbone developers out there. A big advantage to using is that it already has a pretty good mindshare.
