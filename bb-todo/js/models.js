window.TodoItem = Backbone.Model.extend({
  toggle: function() {
    this.set('completed', !this.get('completed'));
  }
});

window.TodoItems = Backbone.Collection.extend({
  model: TodoItem,
  url: '/todos',

  initialize: function(){
    this.on('obliterate', this.hideModel, this);
  },

  hideModel: function(model){
    // model.trigger('hide');
    console.log('pre', this);
    this.remove(model);
    console.log('post', this);
  }
});