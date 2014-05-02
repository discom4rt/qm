$(function(){
  var MAX_NUM_SQUARES = 225,
    $parcels = $('#parcel-matrix'),
    $parcel = $('<li class="parcel"></li>'),
    $newParcel,
    i;

  for(i = 0; i < MAX_NUM_SQUARES; i++) {
    $newParcel = $parcel.clone();

    if( i % Math.sqrt(MAX_NUM_SQUARES) === 0 ) {
      $newParcel.addClass('new-line');
    }

    $parcels.append($newParcel);
  }
});