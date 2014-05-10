QM.Views.FieldView = Backbone.View.extend({
  el: $('#map-container'),

  plainTemplate: $('#plain-map').html(),

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

    QM.EventBus.on('selected:parcel', _.bind(this.teardown, this));
    QM.EventBus.on('cancel:parcel', _.bind(this.render, this));
    this.render();
  },

  render: function() {
    this.$el.find('.middle').html(this.plainTemplate);
    this.$selectionLine = $('#selection-line');
    this.$map = $('#map-parcels');

    if( this.$currentRect ) {
      this.$sectionOverview.show();
      this.drawSelectionLine();
    }
  },

  teardown: function() {
    this.$map.hide();
    this.$sectionOverview.hide();
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
      sectionNumber = $target.closest('g').prevAll().length,
      section = this.collection.at(sectionNumber),
      sectionNumberBox;

    this.$currentRect = $target;
    this.$sectionNumber.text('Feld '+ section.get('number'));
    this.$sectionCoordinates.text(section.get('coordinates'));
    this.currentSectionIndex = sectionNumber;
    this.$sectionOverview.show();

    this.drawSelectionLine();

    // let everyone know that a section was selected
    QM.EventBus.trigger('selected:section', section);
  },

  drawSelectionLine: function() {
    var targetBox = this.$map.find('rect').get(this.currentSectionIndex).getBBox(),
      mapBox = this.$map[0].getBoundingClientRect(),
      sectionNumberBox = this.$sectionNumber[0].getBoundingClientRect();

    y = sectionNumberBox.top - mapBox.top + 8;
    x = (sectionNumberBox.left * 800/mapBox.width) - mapBox.left - 10;
    // console.log(x, y)
    // console.log(sectionNumberBox,mapBox)
    this.$selectionLine.attr('d', 'M' + (targetBox.x - 1) + ',' + (targetBox.y + 1) + ' L' + x + ',' + y);
    this.$selectionLine.show();
  },

  hideDetail: function( event ) {
    this.$sectionOverview.hide();
    QM.EventBus.trigger('deselected:section', this.collection.at(this.currentSectionIndex));
    this.currentSectionIndex = -1;
    this.$currentRect = null;
    this.$selectionLine.hide();
  }
});
