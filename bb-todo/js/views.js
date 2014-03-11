window.TodoView = Backbone.View.extend({
  template: _.template('<span class="input-group-addon"><input <%= completed ? "checked=checked" : "" %> type="checkbox"></span><input value="<%= val %>" class="form-control<%= completed ? " finished" : "" %>" type="text"><span class="input-group-btn"><button class="btn btn-danger" type="button"><i class="glyphicon glyphicon-remove"></i></button></span>'),
  events: {
    'change input[type=checkbox]' : 'toggle',
    'change .form-control' : 'update',
    'click .btn-danger' : 'remove'
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy hide', this.remove, this);
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  remove: function(){
    // This needs to actually delete it, not hide it
    console.log('here', this.model);
    // this.$el.remove();
    this.model.trigger('obliterate');
  },
  update: function() {
    this.model.set('val', this.$('.form-control').val());
  },
  toggle: function() {
    this.model.toggle();
    this.render();
  },
  className: 'input-group input-group-lg'

});

window.TodosView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },

  render: function(){
    this.addAll()
    return this;
  },

  addAll: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(todoItem){
    var todoView = new TodoView({model: todoItem});
    this.$el.append(todoView.render().el);
  },

  filterCompleted: function() {
    this.collection = this.collection.filter(function(item) {
      return !item.get('completed');
    });
    this.render();
  }
});