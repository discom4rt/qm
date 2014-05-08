QM.Models.Section = Backbone.Model.extend({

  parcels: new QM.Collections.Parcels(),

  defaults: {
    number: 0,
    coordinates: '52° 28” 24” N, 13° 24” 5” O'
  }
});

QM.Models.Section.NUM_SECTIONS = 14028;
