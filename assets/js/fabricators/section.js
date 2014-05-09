QM.Fabricators.Section = {
  defaults: {
    section: {
      coordinates: function() {
        var d1 = Math.floor(Math.random() * 180),
          m1 = Math.floor(Math.random() * 59),
          s1 = Math.floor(Math.random() * 59),
          d2 = Math.floor(Math.random() * 180),
          m2 = Math.floor(Math.random() * 59),
          s2 = Math.floor(Math.random() * 59);

        return d1 + '° ' + m1 + '′ ' + s1 + '″ N, ' + d2 +'° ' + m2 + '′ ' + s2 + '″ W';
      },

      number: function() {
        return Math.floor(Math.random() * QM.Models.Section.NUM_SECTIONS);
      },

      fabricateParcels: true
    }
  },

  fabricate: function(options) {
    var settings = $.extend(true, {}, this.defaults, options),
      section = new QM.Models.Section({
        number: settings.section.number(),
        coordinates: settings.section.coordinates()
      });


    if( settings.section.fabricateParcels ) {
      section.parcels = QM.Fabricators.Parcels.fabricate(options);
    }

    return section;
  }
};