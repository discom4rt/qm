QM.Fabricators.Parcels = {
  defaults: {
    parcels: {

    }
  },

  fabricate: function(options) {
    var parcels = new QM.Collections.Parcels(),
      settings = $.extend(true, {}, this.defaults, options),
      i;

    for(i = 0; i < QM.Collections.Parcels.MAX_NUM_PARCEL; i++) {
      parcels.add(QM.Fabricators.Parcel.fabricate(options));
    }

    return parcels;
  }
};