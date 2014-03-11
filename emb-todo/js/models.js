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