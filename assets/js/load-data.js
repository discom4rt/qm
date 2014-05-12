$(function() {
  var NUM_SECTIONS = 14028,
    NUM_PARCELS = 225,
    i, j;

  QM.Data.field = new QM.Collections.Field();

  for(i = 0; i < NUM_SECTIONS; i++) {
    var section = QM.Fabricators.Section.fabricate({
      section: {
        fabricateParcels: false
      }
    });

    section.set('number', i + 1);
    QM.Data.field.add(section);
  }

  QM.Data.currentUser = new QM.Models.User({
    name: 'Ivo Schmid',
    email: 'ivo.schmid@qm.com'
  });
});