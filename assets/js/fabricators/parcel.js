QM.Fabricators.Parcel = {
  defaults: {
    parcel: {
      reserved: function() {
        return !!Math.round(Math.random() * QM.Fabricators.Parcel.RESERVED_CHANCE_ADJUSTMENT);
      }
    }
  },

  fabricate: function(options) {
    var parcel = new QM.Models.Parcel(),
      settings = $.extend(true, {}, this.defaults, options);

    parcel = new QM.Models.Parcel({
      reserved: settings.parcel.reserved()
    });

    return parcel;
  }
};

QM.Fabricators.Parcel.RESERVED_CHANCE_ADJUSTMENT = 0.6;