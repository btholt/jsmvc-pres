window.TodoItem = Backbone.Model.extend({
  toggle: function() {
    this.set('completed', !this.get('completed'));
  }
});

window.TodoItems = Backbone.Collection.extend({
  model: TodoItem,
  url: '/todos',

  initialize: function(){
    this.on('remove', this.hideModel, this);
  },

  hideModel: function(model){
    model.trigger('hide');
  }
});