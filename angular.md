# Angular

## app.js

```javascript

var ngTodo = angular.module('ngTodo', [])
  .config(function() {

  });

```

- Creation an Angular app. Typically a pretty short file so don't worry too much about that.
- You'll typically do app-level configurations at this place. You can change the mustache syntax to be different (like we had because it overlaps with Django)

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
  { val: 'Present at Fluent.', completed: false },
  { val: 'Learn Angular.', completed: true },
  { val: 'Do cool things.', completed: true },
  { val: 'Another goal.', completed: false }
];

```

- Adding some default values in. Notice that this is just an array of plain ol' JavaScript object. This is a lot of the power of Angular. It makes a lot of you JavaScript knowledge very useful.
- Notice we're sticking this on the scope. This will not only make it available to rest of where that scope is available, but also where that scope is applicable in the template. Because we use for it display, we need this to be on the scope.

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

## index.html

```html

<body ng-app="ngTodo">
  <section ng-controller="NgTodoCtrl">

  </section>
</body>

```

- We need to tell Angular where the app lives (common to put this on the body or HTML tag if you only plan on having one app on your page.)
- We also need to tell the controller where it has scope. Its scope will only be visible in that element and its subtree. As such, it makes sense to have multiple controllers if you have obvious separationg concerns in your app, or at least different controllers for different pages/routes/states.

```javascript

<div class="input-group input-group-lg" ng-repeat="todo in todos">

```

- Admittedly, this is the feature that made me fall in love with Angular. The simplicity how you can hand it a JavaScript array and how it loops over it with such ease. Much magic. Wow.


```html

<input placeholder="New Todo" ng-class="{finished : todo.completed}" class="form-control" type="text" ng-model="newTask">

```

- Couple of things going on here. We have the ng-class directive. ng-class allows you to have conditional classes. The value part is evaluated for truthiness to see if key part should be applied as a class.
- The ng-model directive is how the two way data binding happens. After putting that directive on, now if it changes in the view, it changes in the JavaScript variable and vice versa.

```javascript

<button ng-click="addNewTask()" class="btn btn-success" type="button">

```

- The ng-click directive is amazing because it just accepts an expression that it runs everytime a click event happens. This also exists mouse-over, key-up, etc.
- There's a danger here because there's a temptation to just stick the raw JS in there. I've seen people put ng-click="completed = !completed" and that's about as complicated as I'd get. Keep your code out of the DOM.