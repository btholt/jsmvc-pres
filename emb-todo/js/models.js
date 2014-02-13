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
   val: 'Speak at Fluent',
   completed: false
 },
 {
   id: 3,
   val: 'Puppies',
   completed: false
 }
];