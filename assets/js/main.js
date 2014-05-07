$(function(){
  var MAX_NUM_SQUARES = 225,
    $parcels = $('#parcel-matrix'),
    $parcel = $('<li class="parcel"></li>'),
    $legendSquares = $('#legend .square'),
    $newParcel,
    i;

  for(i = 0; i < MAX_NUM_SQUARES; i++) {
    $newParcel = $parcel.clone();

    if( i % Math.sqrt(MAX_NUM_SQUARES) === 0 ) {
      $newParcel.addClass('new-line');
    }

    $parcels.append($newParcel);
  }

  function resizeMatrix( even ) {
    var dimension = $parcels.width()/15;

    $legendSquares.css({
      width: dimension - 2,
      height: dimension - 2
    });

    $parcels.find('.parcel').each(function(){
      $(this).css({
        width: dimension,
        height: dimension
      });
    });
  }

  $(window).on('resize', resizeMatrix);
  $(window).trigger('resize');

  var fieldView = new QM.Views.FieldView();
});