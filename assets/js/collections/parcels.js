QM.Collections.Parcels = Backbone.Collection.extend({
  model: QM.Models.Parcel
});

QM.Collections.Parcels.MAX_NUM_PARCEL = 225;
QM.Collections.Parcels.MAX_NUM_PARCEL_SQRT = Math.sqrt(QM.Collections.Parcels.MAX_NUM_PARCEL);