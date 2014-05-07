QM.Views.FieldView = Backbone.View.extend({
  el: $('#map-container'),

  events: {
    'click #map-chooser li': 'changeMap',
    'click rect': 'showDetail',
    'click #cancel-selection': 'hideDetail'
  },

  initialize: function() {
    this.model = new QM.Models.Field();
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
      sectionNumber = $target.closest('g').prevAll().length + 1;

    this.$sectionNumber.text('Feld '+ sectionNumber);
    this.$sectionOverview.show();
  },

  hideDetail: function( event ) {
    this.$sectionOverview.hide();
  }
});
