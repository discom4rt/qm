QM = {
  Models: {},
  Collections: {},
  Views: {},
  Fabricators: {},
  Data: {},
  EventBus: {}
};

// create an event bus for the entire application
_.extend(QM.EventBus, Backbone.Events);