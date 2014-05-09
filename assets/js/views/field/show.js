QM.Views.FieldView = Backbone.View.extend({
  el: $('#map-container'),

  events: {
    'click #map-chooser li': 'changeMap',
    'click rect': 'showDetail',
    'click #cancel-selection': 'hideDetail'
  },

  initialize: function() {
    this.collection = QM.Data.field;
    this.currentSectionIndex = -1;
    this.$sectionOverview = $('#map-caption');
    this.$sectionNumber = $('#map-caption-field');
    this.$sectionCoordinates = $('#map-caption-coordinates');
  },

  changeMap: function( event ) {
    var $target = $(event.target);

    $target.closest('ul').find('a').removeClass('active');
    $target.addClass('active');
  },

  showDetail: function( event ) {
    var $target = $(event.target),
      sectionNumber = $target.closest('g').prevAll().length + 1,
      section = this.collection.at(sectionNumber);

    this.currentSectionIndex = sectionNumber;
    this.$sectionNumber.text('Feld '+ section.get('number'));
    this.$sectionCoordinates.text(section.get('coordinates'));
    this.$sectionOverview.show();

    // let everyone know that a section was selected
    QM.EventBus.trigger('selected:section', section);
  },

  hideDetail: function( event ) {
    this.$sectionOverview.hide();
    QM.EventBus.trigger('deselected:section', this.collection.at(this.currentSectionIndex));
    this.currentSectionIndex = -1;
  }
});
