QM.Fabricators.Section = {
  defaults: {
    section: {
      
    }
  },

  fabricate: function(options) {
    var section = new QM.Models.Section({number: Math.floor(Math.random() * QM.Models.Section.NUM_SECTIONS) }),
      settings = _.extend({}, this.defaults, options);;

    section.parcels = QM.Fabricators.Parcels.fabricate(options);

    return section;
  }
};