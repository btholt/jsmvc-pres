window.TodoItem = Backbone.Model.extend({
  toggle: function() {
    this.set('completed', !this.get('completed'));
  },
  updateText: function(text) {
    this.set('val', text);
  }
});

window.TodoItems = Backbone.Collection.extend({
  model: TodoItem,

  initialize: function(){
    this.on('destroy', this.removeElement, this);
  },

  removeElement: function(model){
    this.remove(model);
  },

  filterCompleted: function() {
    this.remove(this.filter(function(item) {
      return item.get('completed');
    }));
  }
});