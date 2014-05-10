QM.Views.ParcelView = Backbone.View.extend({

  el: $('.middle'),
  freeTemplate: $('#free-parcel-template').html(),
  chosenTemplate: $('#chosen-parcel-template').html(),
  reservedTemplate: $('#reserved-parcel-template').html(),

  events: {
    'click #choose-parcel': 'chooseParcel',
    'click #send-parcel': 'sendParcel',
    'click #contact-parcel': 'contactParcel'
  },

  initialize: function() {
    this.el = $(this.el);
    this.render();
  },

  render: function() {
    if(this.model.isReserved()) {
      this.el.html(this.reservedTemplate);
    } else {
      this.el.html(this.freeTemplate);
    }
  },

  // press escape to get out of whatever you are doing
  cancel: function(event) {
  },

  teardown: function() {

  },

  chooseParcel: function(event) {
    this.model.set('reserved', true);
    this.el.html(this.chosenTemplate);
  },

  sendParcel: function() {

  },

  contactParcel: function() {

  }
});