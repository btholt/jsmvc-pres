Todos.TodoEntryComponent = Ember.Component.extend({
    actions: {
        click: function() {
            this.sendAction('remove');
        }
    }
});
