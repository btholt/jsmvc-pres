ngTodo.controller("NgTodoCtrl", function() {
    this.todos = [
        {val: "Make a sweet app", completed: false},
        {val: "Make a sweet app", completed: false},
        {val: "Make a sweet app", completed: false},
        {val: "Make a sweet app", completed: false},
        {val: "Make a sweet app", completed: false},
        {val: "Make a sweet app", completed: false},
        {val: "Stuff", completed: true},
        {val: "Things", completed: true}
    ];

    this.newTask = "Web Unleashed";

    this.addNewTask = function() {
        if (this.newTask != "") {
            this.todos.unshift({val: this.newTask, completed: false});
            this.newTask = "";
        }
    };

    this.clearCompleted = function() {
        this.todos = this.todos.filter(function(el) {
            return !el.completed;
        });
    };

    this.removeTodo = function(index) {
        this.todos.splice(index, 1);
    };
});
