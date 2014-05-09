QM.Views.SectionView = Backbone.View.extend({
  el: $('#control-details'),

  template: $('#section-template').html(),

  events: {
    'click .parcel': 'showDetail',
    'hover .parcel': 'updateDetailSummary'
  },

  initialize: function() {
    this.model = QM.Fabricators.Section.fabricate({
      parcel: {
        reserved: function() {
          return false;
        }
      }
    });

    this.$parcelMatrix = $('#parcel-matrix');
    this.$fieldNumber = $('#field-number span');
    this.$coordinates = $('#coordinates span');
    this.$legendSquares = $('#legend .square');

    $(window).on('resize', _.debounce(_.bind(this.resizeMatrix, this), QM.Views.SectionView.RESIZE_DEBOUNCE_TIMEOUT));

    QM.EventBus.on('selected:section', this.showDetail);
    QM.EventBus.on('deselected:section', this.showDetail);

    this.render();
  },

  render: function() {
    this.$fieldNumber.text(this.model.get('number'));
    this.$coordinates.text(this.model.get('coordinates'));
    this.$parcelMatrix.html(_.template(this.template, { parcels: this.model.parcels }));
    this.resizeMatrix();
    return this;
  },

  showDetail: function( event ) {

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
  }
});

QM.Views.SectionView.RESIZE_ADJUSTMENT = 0.2;
QM.Views.SectionView.RESIZE_DEBOUNCE_TIMEOUT = 250;