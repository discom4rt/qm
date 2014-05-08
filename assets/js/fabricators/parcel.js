QM.Fabricators.Parcel = {
  defaults: {
    parcel: {
      reserved: function() {
        return !!Math.round(Math.random());
      }
    }
  },

  fabricate: function(options) {
    var parcel = new QM.Models.Parcel(),
      settings = _.extend({}, this.defaults, options);

    parcel = new QM.Models.Parcel({ reserved: settings.parcel.reserved() });

    return parcel;
  }
};