# React.JS

## Important Note

While the other projects in here can be run with the file:/// protocol, this one cannot. This is because JSXTransformer makes AJAX calls to get your JSX. As such, you'll need to use some sort of static file server. The three easiest are:

- Python SimpleHTTPServer
- Node http-server
- PHP 5.5+'s `php -S`

Any of those will work. If you don't know or have any of those, I'd suggest running `npm install -g http-server` and then running `http-server` from the directory of your React project.

## app.jsx

```javascript
/** @jsx React.DOM */
```

- WTF? .jsx? Weird comments? Yeah, this is part of React: JSX. JSX is 95% pure and unfiltered JavaScript. The only difference is that it allows you to write raw HTML as if it were a native JavaScript data type. You can use React without JSX though I wouldn't suggest it; it makes React much easier to write.
- That leading comment needs to be on every page. That's how the JSX parser knows which files to transpile.
- Typically, when using React in a production environment, you would have Grunt, Gulp, Broccoli or whatever transpile the JSX into JS. Because we're lazy and just prototyping, we're including the JSXTransformer which functions much like the {less} transpiler if you've ever used it. It just transforms the JSX on the fly. Don't do that in production.

```javascript
var app = app || {};

(function() {
  'use strict';

})();
```

- This is some Holt-flavored React. This is the best I've found to write it but because the React community is still forming, different and likely better ways are emerging.
- React is totally agnostic to your data layer. Its only concern is the view. This is a departure from the other frameworks which all include ways of handling data, AJAX, and other ways of marshaling data about. React is self-described as often being the V in MVC. Again, as such, we're right a vanilla JS, Holt-flavored data layer underneath it. Take that part with a grain of salt.
- The `app` variable is a global variable that I use to stick all my web-app stuff on.
- The IIFE is offer some scope to that part of the app as well as so I can `'use strict';` that business.

## components.jsx

```javascript
/** @jsx React.DOM */

var app = app || {};
app.components = app.components || {};

(function() {
  'use strict';

  var TodoApp = app.components.TodoApp = React.createClass({
    render: function() {
      return (
        <div className="outer-container">
          <p>interesting text goes here.</p>
        </div>
      );
    }
  });
})();
```

- Bootstrapping up our first component. This will create a base TodoApp component that we'll use to create our app.
- The `var TodoApp = app.components.TodoApp = [...]` double assignment is my own convention. The first assignment is necessary because in order for that component to be available, it needs to be on the local scope. The second assignment is so that component is available anywhere the app object is available.
- The `render` function is a React function that get called anytime the component need to be re-rendered. The key to writing cohesive and idiomatic React is assume that you all the necessary data already. If you're displaying data from JavaScript, write the render function as if that data was already there. Then you worry about getting the data there.
- Notice the raw HTML in the JS. That's the magic of the JSX. One key is that you need only one root element. Even if it's just an encapsulating `div`, it must only be one root element.
- Notice I used `className` for the classes. `class` is a reserved word in JavaScript so it had to be something different.

## app.jsx

```javascript
app.init = function() {
  var TodoApp = app.components.TodoApp;
  React.renderComponent(
    <TodoApp />,
    document.getElementById('app')
  );
};

app.init();
```

- Initializing the app. Like Backbone, you need to stick it somewhere. Here we're just sticking it on the `app` id.
- This is your only direct interaction with actual DOM. Everything else you should interact with the virtual DOM.
- TodoApp as a tag looks weird here. It'll be clear later of why this looks the way it does.
- Notice that you need to set the TodoApp on the local scope here for it work. The reason is that JSX is just transpiling that `TodoApp` to be a function call. As such it needs to be available on the local scope. And no, `<app.components.TodoApp />` doesn't work.
- **All** void elements must have the trailing `/>`. The slash must be there. Include `<img />` and any other HTML that would valid otherwise. That said, in JSX, `<div />` is valid. I wouldn't suggest it though.
- Let's try it out. You should see you component showing up.

```javascript
// TodoApp
render: function() {
  return (
    <div className="outer-container">
      <NewTodo />
      <TodoList />
      <ClearCompleted />
    </div>
  );
}

  [...]

//General function body
var NewTodo = app.components.NewTodo = React.createClass({
  render: function() {
    return (
      <h1>New Todo</h1>
    );
  }
});

var TodoList = app.components.TodoList = React.createClass({
  render: function() {
    return (
      <h1>Todo List</h1>
    );
  }
});

var ClearCompleted = app.components.ClearCompleted = React.createClass({
  render: function() {
    return (
      <h1>Clear Completed</h1>
    );
  }
});
```

- A lot of code but really one concept being communicated: you can compose components of other components and  I would suggest you do that. This leads to easier-to-digest code, separation of concerns, and reuseable components.
- Take a look at it. You should see the three h1s.

```javascript
// TodoApp
getInitialState: function() {
  return {
    todos: []
  };
},
componentDidMount: function() {
  var data = app.retrieveData();
  this.setState({todos: data});
  console.log(this.state);
},
```

- Let's give this some data. We're doing this in a bit of a convuluted way since we're using fixtures but this is how you'd do it if you were doing AJAX. `componentDidMount` and `getInitialState` are both React functions.
- `componentDidMount` is run immediately after the function is rendered for the first time (and never again.) This is the time you want to be calling your AJAX to get your data.
- Since your function will render once without data, you need to give it an initial state which is what `getInitialState` is for. Here you could return dummy data or placeholders; we're just passing an empty array because we that structure to exist so it doesn't error but we don't want it to display anything yet.

## app.jsx

```javascript
// General function body
app.retrieveData = function() {
  return app.FIXTURES;
};
```

- This would typically be an AJAX function and return a promise that the component would deal with. In this case, we're just going return the fixtures from fixtures.js.
- Refresh the page. You should see in your dev console the fixtures. These items are now attached to the `TodoApp` component's state and ready to be displayed.

## components.jsx

```javascript
// TodoApp.render
render: function() {
  return (
    <div className="outer-container">
      <NewTodo />
      <TodoList
        todos={this.state.todos}
      />
      <ClearCompleted />
    </div>
  );
}
```

- This is how the parent elements pass data and functions to children objects: via props.
- In this case we're passing the todos state from the parent to `TodoList` component as a prop.
- Data only flows one way in a React app: from the parents to the children. Data does not flow from the children to the parents. If you want to modify the parent's data, you'll pass a function from the parent to the child via a prop. We'll do that in a sec.

```javascript
// TodoList
var TodoList = app.components.TodoList = React.createClass({
  render: function() {
    return (
      <div className="todos">
        {this.props.todos.map(function(todo, index) {
          return (
            <TodoItem
              todo={todo}
              index={index}
            />
          );
        })}
      </div>
    );
  }
});
```

- Rendering a list of `TodoItem`s which we'll define in a second. This is the ng-repeat / #each of React: `.map()`.
- Here we're using the props which is an object containing everything that the parent passed in. A child cannot change its props; it can only change its state. The data must be changed at the parent level.
- We map over the `todos` prop to create a `TodoItem` for each todo. We'll pass in the todo itself as well as the index (which we'll use for modifiying the todos array later.)

```javascript
// General function body
var TodoItem = app.components.TodoItem = React.createClass({
  render: function() {
    var inputClassName = "form-control";
    if (this.props.todo.completed) {
      inputClassName += " finished";
    }
    return (
      <div className="input-group input-group-lg">
        <span className="input-group-addon">
          <input checked={this.props.todo.completed} type="checkbox" />
        </span>
        <input value={this.props.todo.val} className={inputClassName} type="text" />
        <span className="input-group-btn">
          <button className="btn btn-danger" type="button">
            <i className="glyphicon glyphicon-remove"></i>
          </button>
        </span>
      </div>
    );
  }
});
```

- Here we're finally going to display our todos. Again, all the data is availabe via props. We're just displaying them.
- The class stuff at the top is how the `finsished` class is applied. There's a few syntax to do this but in simple cases the one shown works well enough.
- Let's look at it. Try clicking on the checkbox or changing the value of the input. Weird, right? Nothing changes. This is because these are available via props and thus cannot be changed at the child level. In order to update them, we have to update the parent. We'll pass some function around to do that.


```javascript
// TodoApp
updateVal: function(val, index) {
  var state = this.state;
  state.todos[index].val = val;
  this.setState(state);
},
toggleCompleted: function(index) {
  var state = this.state;
  state.todos[index].completed = !state.todos[index].completed;
  this.setState(state);
},
deleteTodo: function(index) {
  var state = this.state;
  state.todos.splice(index, 1);
  this.setState(state);
},
render: function() {
  return (
    <div className="outer-container">
      <NewTodo />
      <TodoList
        todos={this.state.todos}
        updateVal={this.updateVal}
        toggleCompleted={this.toggleCompleted}
        deleteTodo={this.deleteTodo}
      />
      <ClearCompleted />
    </div>
  );
}

[...]

// TodoList
render: function() {
  return (
    <div className="todos">
      {this.props.todos.map(function(todo, index) {
        return (
          <TodoItem
            todo={todo}
            index={index}
            updateVal={this.props.updateVal}
            toggleCompleted={this.props.toggleCompleted}
            deleteTodo={this.props.deleteTodo}
          />
        );
      }.bind(this))}
    </div>
  );
}
```

- The functions to actually do the updating.
- Notice we're pulling the state and then updating it. The state actually does update if you do `this.state.foo = 'bar';` instead of `this.setState({foo:'bar'})` but because React uses getters and setters to detect when to re-render, you don't get that free re-rendering. Always use `setState`.
- We have to pass them the `TodoApp` through the `TodoList` to the `TodoItem`.
- Notice in the `.bind(this)` in the the `TodoList`. When you run `map` it changes the context from `this` being the React component to being the `todos` array thus we need to shift that context to be the React component using `bind`. You could also use is `var _this = this` strategy.


```javascript

// TodoItem
var TodoItem = app.components.TodoItem = React.createClass({
  handleVal: function(e) {
    this.props.updateVal(e.target.value, this.props.index);
  },
  handleToggle: function() {
    this.props.toggleCompleted(this.props.index);
  },
  handleDelete: function() {
    this.props.deleteTodo(this.props.index);
  },
  render: function() {
    var inputClassName = "form-control";
    if (this.props.todo.completed) {
      inputClassName += " finished";
    }
    return (
      <div className="input-group input-group-lg">
        <span className="input-group-addon">
          <input onChange={this.handleToggle} checked={this.props.todo.completed} type="checkbox" />
        </span>
        <input onChange={this.handleVal} value={this.props.todo.val} className={inputClassName} type="text" />
        <span className="input-group-btn">
          <button onClick={this.handleDelete} className="btn btn-danger" type="button">
            <i className="glyphicon glyphicon-remove"></i>
          </button>
        </span>
      </div>
    );
  }
});
```

- Here we bind to the events using `onClick` and `onChange`. From there we take the events, gather the necessary info, and pass it back up to the parent's functions.
- A good pattern is to handle events on the child compoents and handle the data changes on the parents. It is possible to simply bind a parent's method to handle the events but it's an antipattern; try to keep the handling of the data as close to the source as possible. In this case, the events happen on the child, so handle it there. The data changes at the parent level so handle it there.
- You're not actually typing into the input. You're actually creating a synthetic event in the virtual DOM that then is updating the real DOM via its stored, state values.
- Let's look at it. Notice you can now change the completed status and update the text of the todos.

```javascript
// TodoApp
createNewTodo: function(newValue) {
  var state = this.state;
  state.todos.unshift({val:newValue,completed:false});
  this.setState(state);
},

[...]

// TodoApp.render
<NewTodo
  createNewTodo={this.createNewTodo}
/>

// General function body
var NewTodo = app.components.NewTodo = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      newValue: ""
    };
  },
  handleNewTodo: function(e) {
    this.setState({newValue: ""});
    this.props.createNewTodo(this.state.newValue);
  },
  render: function() {
    return (
      <div className="add-todo-group input-group input-group-lg">
        <span className="input-group-addon">
          <i className="glyphicon glyphicon-list-alt"></i>
        </span>
        <input valueLink={this.linkState('newValue')} placeholder="New Todo" className="form-control" type="text" />
        <span className="input-group-btn">
          <button className="btn btn-success" type="button" onClick={this.handleNewTodo}>
            <i className="glyphicon glyphicon-plus"></i>
          </button>
        </span>
      </div>
    );
  }
});
```

- Let's work on the `NewTodo`. Notice that the state of `NewTodo` is kept at the state level of this component versus being defined on the parent. The reason for this is that the `newValue` is not useful anywhere but here. Keep the state as close the component as you can.
- We're also experimenting with a mixin here. A mixin, as some of you may expect, is a functionality that you can mix into a component. Here we're just leveraging the `LinkedStateMixin` which comes with React is you use the version with addons.
- The `valueLink` is an easy to acheive two-way data binding. If you recall what we did with the `TodoItem`s, we had to handle an event then update the state. Here since we just want the two values bound together with nothing else, we can leverage this `valueLink` business to get us those two things bound. This does not work with props. You have to pass the `valueLink` down through a parent if you want to do from a parent to a child.
- Let's try it. It should work as expected.
- For simplicity and laziness, only clicking the button works. If you wanted to make enter-submit work as well, wrap the New Todo input in a form and stick an `onSubmit` listener. That would cover both the button and the enter-submit.

```javascript
// TodoApp
filterCompleted: function() {
  var newTodos = this.state.todos.filter(function(el, index) {
    return !el.completed;
  });
  this.setState({todos: newTodos});
},

[...]

// TodoApp.render
<ClearCompleted
  filterCompleted={this.filterCompleted}
/>

[...]

// General function body
var ClearCompleted = app.components.ClearCompleted = React.createClass({
  handleClick: function(e) {
    this.props.filterCompleted();
  },
  render: function() {
    return (
      <div className="btn-clear-group">
        <button onClick={this.handleClick} className="btn btn-primary btn-clear">Clear Completed</button>
      </div>
    );
  }
});
```

- Nothing new here, just more application of what we've learned!
- Try it! It should all work now.