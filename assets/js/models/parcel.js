QM.Models.Parcel = Backbone.Model.extend({
  defaults: {
    reserved: false
  },

  initialize: function() {
    this.on('change:reserved', this.reserve, this);
  },

  isReserved: function() {
    return this.get('reserved');
  },

  reserve: function( model, value, options ) {

  }
});
