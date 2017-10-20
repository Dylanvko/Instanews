$(document).ready(function() {

  $('#sections').on('change',function(){
    var section = $('#sections').val();
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({'api-key': '516e14d87c8e478195abbd4aaa72b938'
});

$.ajax({
  url: url,
  method: 'GET'
}).done(function(data) {
  console.log(data);

$.each(data.results, function(index, value) {
  console.log(value.title);
  $('#stories > ul').append('<li>' + value.abstract + '</li>');
  $('li').slice(12).css('display', 'none');
});

})
.fail(function(err) {
  throw err;
}); 
}); 
})
//Hints: Will need to use .Filter() and .Slice()