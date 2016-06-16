
$(function () {
  var $loadMoreBtn = $('[data-action="load-more"]');
  var loadMoreArea = '.load-more-area';

  $loadMoreBtn.on('click', function () {

    $(this).closest(loadMoreArea).next('.load-more-next').removeClass('display-none').attr('tabindex', '-1').focus();
    $(this).closest(loadMoreArea).next('.load-more-next').next(loadMoreArea).removeClass('display-none');

    $(this).closest(loadMoreArea).remove();
  });

});
