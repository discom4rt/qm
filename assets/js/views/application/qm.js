QM.Views.QMView = Backbone.View.extend({
  OVERLAY_TIMEOUT: 1000,

  el: $('.overlay'),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.delay(this.OVERLAY_TIMEOUT).fadeOut();
  }
});