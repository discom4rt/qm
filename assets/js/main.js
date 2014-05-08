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

  function resizeMatrix( event ) {
    var dimension = $parcels.width()/15;

    // if we are retrying, make a little adjustment
    if( event === -1 ) {
      dimension = dimension - 0.2;
    }

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

    // if we just retried, stop
    if( event === -1) {
      return;
    }

    // if we fucked up, retry
    if( $parcels.width() !== $parcels.height()) {
      resizeMatrix( -1 );
    }
  }

  $(window).on('resize', _.debounce(resizeMatrix, 250));
  resizeMatrix();


  // $('rect').each(function() {
  //   var rect = $(this),
  //     x, y;

  //   x = parseFloat(rect.attr('x'));
  //   y = parseFloat(rect.attr('y'));

  //   // rect.attr('x', Math.round(x));
  //   rect.attr('y', Math.round(y));

  //   // if( Math.abs(x - px) >= 5) {
  //   //   // console.log(rect.closest('g').nextAll().find('rect[y='+y+']').length)
  //   //   rect.closest('g').nextAll().find('rect[y='+y+']').each(function(){
  //   //     $(this).attr('x', parseInt($(this).attr('x')) - 1)
  //   //   })
  //   //   // rect.attr('x', x - 1);
  //   // }

  //   // if( Math.abs(y - py) >= 5) {
  //   //   rect.attr('y', y - 1);
  //   // }
  // });

  var fieldView = new QM.Views.FieldView();
});