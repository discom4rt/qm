QM.Views.SectionView = Backbone.View.extend({
  el: $('#control-details'),

  template: $('#section-template').html(),

  events: {
    'click .parcel': 'displayParcel',
    'hover .parcel': 'updateParcelSummary'
  },

  initialize: function() {
    this.setDefaultModel();

    this.$parcelMatrix = $('#parcel-matrix');
    this.$fieldNumber = $('#field-number span');
    this.$coordinates = $('#coordinates span');
    this.$legendSquares = $('#legend .square');

    $(window).on('resize', _.debounce(_.bind(this.resizeMatrix, this), QM.Views.SectionView.RESIZE_DEBOUNCE_TIMEOUT));

    QM.EventBus.on('selected:section', _.bind(this.showDetail, this));
    QM.EventBus.on('deselected:section', _.bind(this.hideDetail, this));

    this.render();
  },

  render: function() {
    this.$fieldNumber.text(this.model.get('number'));
    this.$coordinates.text(this.model.get('coordinates'));
    this.$parcelMatrix.html(_.template(this.template, { parcels: this.model.parcels }));
    this.resizeMatrix();
    return this;
  },

  showDetail: function( section ) {
    this.model = section;
    this.model.parcels = QM.Fabricators.Parcels.fabricate();
    this.render();
  },

  hideDetail: function ( section ) {
    this.setDefaultModel();
    this.render();
  },

  displayParcel: function( event ) {
    var $target = $(event.target),
      parcelIndex = $target.prevAll('li').length,
      parcel = this.model.parcels.at(parcelIndex),
      view;
      

    QM.EventBus.trigger('selected:parcel', parcel);
    view = new QM.Views.ParcelView({model: parcel});
  },

  resizeMatrix: function( event ) {
    var dimension = this.$parcelMatrix.width()/QM.Collections.Parcels.MAX_NUM_PARCEL_SQRT;

    // if we are retrying, make a little adjustment
    if( event === -1 ) {
      dimension = dimension - QM.Views.SectionView.RESIZE_ADJUSTMENT;
    }

    this.$legendSquares.css({
      width: dimension - 2,
      height: dimension - 2
    });

    this.$parcelMatrix.find('.parcel').css({
      width: dimension,
      height: dimension
    });

    // if we just retried, stop
    if( event === -1) {
      return;
    }

    // if we fucked up, retry
    if( this.$parcelMatrix.width() !== this.$parcelMatrix.height()) {
      this.resizeMatrix( -1 );
    }
  },

  setDefaultModel: function() {
    this.model = QM.Fabricators.Section.fabricate({
      parcel: {
        reserved: function() {
          return false;
        }
      },

      section: {
        number: function() {
          return '';
        },

        coordinates: function() {
          return '';
        }
      }
    });
  }
});

QM.Views.SectionView.RESIZE_ADJUSTMENT = 0.2;
QM.Views.SectionView.RESIZE_DEBOUNCE_TIMEOUT = 250;