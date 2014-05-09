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
    this.$map = $('#map-parcels');
    this.$sectionOverview = $('#map-caption');
    this.$sectionNumber = $('#map-caption-field');
    this.$sectionCoordinates = $('#map-caption-coordinates');
    this.$selectionLine = $('#selection-line');
  },

  changeMap: function( event ) {
    var $target = $(event.target);

    $target.closest('ul').find('a').removeClass('active');
    $target.addClass('active');
  },

  showDetail: function( event ) {
    var $target = $(event.target),
      targetBox = $target[0].getBBox(),
      mapBox = this.$map[0].getBoundingClientRect(),
      sectionNumber = $target.closest('g').prevAll().length + 1,
      section = this.collection.at(sectionNumber),
      sectionNumberBox;

    this.$sectionNumber.text('Feld '+ section.get('number'));
    this.$sectionCoordinates.text(section.get('coordinates'));
    this.currentSectionIndex = sectionNumber;
    this.$sectionOverview.show();
    sectionNumberBox = this.$sectionNumber[0].getBoundingClientRect();

    y = sectionNumberBox.top - mapBox.top + 8;
    x = sectionNumberBox.left - mapBox.left;
    console.log(x, y)
    console.log(sectionNumberBox,mapBox)
    this.$selectionLine.attr('d', 'M' + (targetBox.x - 1) + ',' + (targetBox.y + 1) + ' L' + x + ',' + y);
    this.$selectionLine.show();

    // let everyone know that a section was selected
    QM.EventBus.trigger('selected:section', section);
  },

  hideDetail: function( event ) {
    this.$sectionOverview.hide();
    QM.EventBus.trigger('deselected:section', this.collection.at(this.currentSectionIndex));
    this.currentSectionIndex = -1;
    this.$selectionLine.hide();
  }
});
