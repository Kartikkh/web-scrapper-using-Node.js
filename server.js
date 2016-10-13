var express = require('express')
var cheerio = require("cheerio");
var request = require("request");
var url = require("url");
var fs = require('fs');
var app = express();
 
app.get('/scrape/', function(req, res){

	 urls ="http://www.imdb.com/title/tt2395427/";
	request(urls,function(error,response,body){
	if(!error && response.statusCode==200)
		{
			var $ =cheerio.load(body);
			var title, release, rating, review;
            var json = { title : "", release : "", rating : "", review : ""};
            
			
			 json.title =$("[itemprop=name]").text();
			
			 json.release= $("[itemprop=name]").children().children().text();
              
			 json.rating = $("[itemprop=ratingValue]").text();
		
			 json.review= $(".user-comments").text();
	     }
		
		
		
	  fs.writeFile('output.json',JSON.stringify(json, null, 7),function(error){
		  if(!error)
			   console.log('File successfully written! - Check your project directory for the output.json file');

	  });
		
		res.send('Check your console!');
	});
  
})
app.listen(3000);