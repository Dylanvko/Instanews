$(document).ready(function() {

var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
  'api-key': "516e14d87c8e478195abbd4aaa72b938"
});

$.ajax({
  url: url,
  method: 'GET'
}).done(function(data) {
  console.log(data);

$.each(data.results, function(index, value) {
  console.log(value.title);
  $('#story-grid').append('<li>' + value.abstract + '</li>');
  $('li').slice(13).css('display', 'none');
});

})
.fail(function(err) {
  throw err;
}); 
}); 

//Hints: Will need to use .Filter() and .Slice()