import 'jquery';
import {disable, enable} from './module';

(function() {
  $(function() {

    // outfit
    let outfitHeight = parseInt($('#container').css('height'));
    let listItem = $('.list').parent().html();
    let listHeight = parseInt($('.list').css('height'));

    if (outfitHeight > 900) {
      for (let i = listHeight; i <= outfitHeight - (listHeight * 4); i += listHeight) {
        $('.list').parent().append(listItem);
      } // end for
      $('.list').last().addClass('last');
    } else if (outfitHeight === 900) {
      for (let i = listHeight; i <= outfitHeight - (listHeight * 2); i += listHeight) {
        $('.list').parent().append(listItem);
      } // end for
      $('.list').last().addClass('last').css('height', '40px');
    } // end if-else-if

    // head
    let pencil = $('.fa-pencil-alt');
    let eraser = $('.fa-eraser');
    let notes = $('.notes');
    pencil.on('click', function() {
      enable($(this), 'writing', notes, 'disabled', true);
      disable(eraser, 'cleaning');
    }); // end click

    eraser.on('click', function() {
      enable($(this), 'cleaning', notes, 'disabled', true);
      disable(pencil, 'writing');
    }); // end click

    // notes
    notes.on('click', function() {
      $(this).focus();
    }); // end click

    notes.on('mouseleave', function() {
      $(this).blur();
    }); // end mouseleave

    notes.on('keyup', function(event) {
      if (event.which === 13)
        $(this).blur();
      if (event.which === 8 && $(this).val().length === 0) {
        $(this).css({
          textDecoration: 'none'
        });
      } // end if
    }); // end keyup

    notes.on('click', function() {
      if (eraser.hasClass('cleaning')) {
        if ($(this).val().length !== 0)
          $(this).css({
            textDecoration: 'line-through red'
          }).attr('disabled', true);
        else
          $(this).attr('disabled', true);
      } // end if
    }); // end click

  }); // end jQuery
}()); // end IIFE
