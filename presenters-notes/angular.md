# Angular

## app.js

```javascript

var ngTodo = angular.module('ngTodo', [])
  .config(function() {

  });

```

- Creation an Angular app. Typically a pretty short file so don't worry too much about that.
- You'll typically do app-level configurations at this place. You can change the mustache syntax to be different (like we had because it overlaps with Django)

## ngTodoCtrl.js

```javascript

ngTodo.controller('NgTodoCtrl', function NgTodoCtrl($scope) {

});

```

- Setting up your controller in Angular. This can take several forms but I found this to be the most concise.
- Notice the dependency in the $scope. Angular actually looks at the name of the inject parameter and injects the correct module, including your own custom services.
- The $scope service is exactly it sounds like: a scope object. It will inherit from its parents scopes and act like how you expect block level scoping would (it can see parents but not vice versa.)

```javascript

$scope.todos = [
  { val: 'Make a sweet app.', completed: false },
  { val: 'Present the talk.', completed: false },
  { val: 'Learn Angular.', completed: true },
  { val: 'Do cool things.', completed: true },
  { val: 'Another goal.', completed: false }
];

```

- Adding some default values in. Notice that this is just an array of plain ol' JavaScript object. This is a lot of the power of Angular. It makes a lot of you JavaScript knowledge very useful.
- Notice we're sticking this on the scope. This will not only make it available to rest of where that scope is available, but also where that scope is applicable in the template. Because we use for it display, we need this to be on the scope.

## index.html

```html

<body ng-app="ngTodo">
  <section ng-controller="NgTodoCtrl">
  </section>
</body>

```

- Just some set-up stuff here.
- We need to tell Angular where the app lives (common to put this on the body or HTML tag if you only plan on having one app on your page.)
- We also need to tell the controller where it has scope. Its scope will only be visible in that element and its subtree. As such, it makes sense to have multiple controllers if you have obvious separationg concerns in your app, or at least different controllers for different pages/routes/states.
- You're telling Angular that your app resides in the body (you can have multiple apps on a page.)
- You're also telling Angular that `section` is governed my the NgTodoCtrl. You can also have multiple controllers governing different pieces of the page.
- You can even have nested controllers but make sure to use the Angular-UI Router if you're going to attemp that business. The Angular router doesn't do it (or at least not well.)

```html

<input placeholder="New Todo" class="form-control" type="text" ng-model="newTask">
{{ newTask }}

```

- The ng-model directive is how the two way data binding happens. After putting that directive on, now if it changes in the view, it changes in the JavaScript variable and vice versa. So if we change it in the JS, it automagically changes the view and if we enter stuff in the input, the JS variable changes. Let's check it out.
- The moustache syntax is how to simply dump out the value of that value to the page. It stays updated!

```javascript

<div class="input-group input-group-lg" ng-repeat="todo in todos">

```

- This will loop over your array and create an element for each of the indexes in the array.
- Admittedly, this is the feature that made me fall in love with Angular. The simplicity how you can hand it a JavaScript array and how it loops over it with such ease. Such magic. Wow.

## ngTodoCtrl.js

```javascript

$scope.addNewTask = function() {
  $scope.todos.unshift({ completed: false, val: $scope.newTask });
  $scope.newTask = '';
};

$scope.clearCompleted = function() {
  $scope.todos = $scope.todos.filter(function(el) {
    return !el.completed;
  });
}

```

- So at first it was just kind of cool that we were using the POJO for the Angular objects but this is where it become truly beautiful : you can interact with them with all of your existing JS knowledge. Here we just using unshift (the opposite of pop, an ES3 Array function) and filter (an ES5 Array function; simply filters out objects based on boolean return values.)
- We're sticking these functions on the scope, making them available to be called from the template.
- Let's check how this affects the ng-repeat.

## index.html

```html

<button ng-click="addNewTask()" class="btn btn-success" type="button">

```

- The ng-click directive is amazing because it just accepts an expression that it runs everytime a click event happens. This also exists mouse-over, key-up, etc.
- There's a danger here because there's a temptation to just stick the raw JS in there. I've seen people put ng-click="completed = !completed" and that's about as complicated as I'd get. Keep your code out of the DOM.

```html

<input ng-class="{finished : todo.completed}" class="form-control" type="text" ng-model="todo.val">

```

- Let's do a conditional class. This way it'll be strikedout when the todo is completed. Notice it's cool to have multiple directives on a single element.
- Let's finish out the rest of the page.