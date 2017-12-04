'use strict';

$(document).ready(() => {

  $('#sections').on('change',() => {
    let section = $('#sections').val();
    let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json`;
    url += '?' + $.param({
      'api-key': '516e14d87c8e478195abbd4aaa72b938'
    });
    $('.logo img').css({
      'height': '50%',
      'width': '50%'
    });
    $('.site-header').css({
      'height': 'auto'
    });

    $('#stories ul li').remove();

    $('.ajax-loader').css('display', 'block');

    $.ajax({
      url: url,
      method: 'GET'
    }).done((data) => {

      let slicedData = data.results.slice(0, 12);

      let filteredData = slicedData.filter((item) => {
        return item.multimedia.length;
      });

      $.each(filteredData,(index, value) => {
        $('#stories > ul').append(`<li><a href="${value.url}" target="_blank"><div class="storywrapper"><div class="imageurl" style="background-image:url(${value.multimedia[4].url})"><div class="story-text"><p>${value.abstract} </p></div></div></div></a></li>`);
      });
    }).fail((err) => {
      alert('Sorry, there was an error.');
      throw err;
    }).always(() => {
      $('.ajax-loader').css('display', 'none');
      
    });
  });
});