QM.Models.Section = Backbone.Model.extend({

  parcels: new QM.Collections.Parcels(),

  defaults: {
    number: -1,
    coordinates: '40° 26′ 46″ N 79° 58′ 56″ W'
  }
});

QM.Models.Section.NUM_SECTIONS = 14028;
