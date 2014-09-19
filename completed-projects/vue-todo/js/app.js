var app = new Vue({
  el: "#app",
  data: {
    newTask: '',
    todos: [
      {val: "Such unleashed", completed: true},
      {val: "Much web", completed: true},
      {val: "So Vue", completed: false},
      {val: "Very framework", completed: true},
      {val: "Wow", completed: false}
    ]
  },
  methods: {
    addNew: function(newTask) {
      this.$data.todos.unshift({val:this.$data.newTask});
      this.$data.newTask = "";
    },
    remove: function(index) {
      this.$data.todos.$remove(index);
    },
    clearCompleted: function(){
      this.$data.todos = this.$data.todos.filter(function(el) { return !el.completed });
    }
  }
});