'use strict';

$(document).ready(function () {

  $('#sections').on('change', function () {
    var section = $('#sections').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({
      'api-key': '516e14d87c8e478195abbd4aaa72b938'
    });
    $('.logo img').css({
      'height': 'auto',
      'width': '5rem'
    });
    $('.site-header').css({
      'height': '4.5rem'
    });

    $('#stories ul li').remove();

    $('.ajax-loader').css('display', 'block');

    $.ajax({
      url: url,
      method: 'GET'
    }).done(function (data) {

      var slicedData = data.results.slice(0, 12);
      console.log(slicedData);
      var filteredData = slicedData.filter(function (item) {
        return item.multimedia.length;
      });

      $.each(filteredData, function (index, value) {
        $('#stories > ul').append('<li><a href="' + value.url + '" target="_blank"><div class="storywrapper"><div class="imageurl" style="background-image:url(' + value.multimedia[4].url + ')"><div class="story-text"><p>' + value.abstract + ' </p></div></div></div></a></li>');
      });
    }).fail(function (err) {
      alert('Sorry, there was an error.');
      throw err;
    }).always(function () {
      $('.ajax-loader').css('display', 'none');
      // could also do .remove() to remove from the DOM, however you'd have to use .append() at the top instead of display block.
    });
  });
});