QM.Fabricators.Section = {
  defaults: {
    section: {
      number: function() {
        return Math.floor(Math.random() * QM.Models.Section.NUM_SECTIONS);
      }
    }
  },

  fabricate: function(options) {
    var settings = _.extend({}, this.defaults, options),
      section = new QM.Models.Section({number: settings.section.number() });

    section.parcels = QM.Fabricators.Parcels.fabricate(options);

    return section;
  }
};