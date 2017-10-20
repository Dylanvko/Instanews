$(document).ready(function() {
  
    $('#sections').on('change',function(){
      var section = $('#sections').val();
      var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
      url += '?' + $.param({'api-key': '516e14d87c8e478195abbd4aaa72b938'
  });
  
$('#stories ul li').remove();

  $.ajax({
    url: url,
    method: 'GET'
  }).done(function(data) {
    
    var slicedData = data.results.slice(0,12);
    console.log(slicedData);
  $.each(slicedData, function(index, value) {
    $('#stories > ul').append('<li>' + value.abstract + '<div class="imageurl" style="background-image:url(' + value.multimedia[4].url + ')"> </div></li>');
  });
  

  })
  .fail(function(err) {
    throw err;
  }); 
  }); 
  })
  //Hints: Will need to use .Filter() and .Slice()
