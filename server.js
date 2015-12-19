var express = require('express');
var Type = require('type-of-is');
var bodyParser = require('body-parser');
var app     = express();
var fs = require('fs');
var request = require("request");
var cheerio = require('cheerio');


app.use(bodyParser.urlencoded({ extended: true })); 



app.get('/', function(req, res) {
  displayForm(res);
});

var url;

var nextPage = true;

	app.post('/url', function(req, res) {
	url= req.body.name;
  request({
  uri: url,
}, function(error, response, body) {
  var $ = cheerio.load(body);

  var Result = 'hi';
    
	var openIssues = 	$('a.btn-link.selected').text();
	var numIssues = parseInt((openIssues.replace(/ /g,'')).replace(/\n/g,'').split("O")[0]);
	var times=[];
	var dates=[];
	var issuesHours=0;
	var issuesWeek=0;
	var otherIssues =0;
	var date = new Date().getTime();
	
	
		$('time').each(function(i,elem){
      
	  times[i] = $(this).attr('datetime');
	 // if (date > new Date(times[i]))
	 console.log(times[i]);
	  var dateTime = times[i].split("T");
	  var hours = dateTime[1].split(":");
	  var parts = dateTime[0].split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
		dates[i] = new Date(parts[0], parts[1]-1, parts[2], hours[0], hours[1] , hours[2].split("Z")[0]);
	  if ( date-dates[i].getTime() < 24*60*60*1000)
	   {
			//console.log(issuesHours);
			issuesHours++;
	   }
	   else if (date - dates[i].getTime() < 7*24*60*60*1000){
		//	console.log(date-dates[i].getTime()+ "   oissueweek");
			issuesWeek++;
	   }else{
			nextPage = false;
	   }
	   
	 // console.log( issuesHours + "   " + issuesWeek);
		});
	}

	otherIssues = numIssues - issuesHours - issuesWeek;
	
	res.send('<h1> Result </h1><table> <tr> <td> Total number of open issues : </td>  <td> '+ numIssues +'</td></tr> <tr> <td>Number of open issues that were opened in the last 24 hours : </td> <td> '+ issuesHours +'</td> </tr> <tr> <td>Number of open issues that were opened more than 24 hours ago but less than 7 days ago : </td> <td>'+issuesWeek+'</td></tr> <tr> <td>Number of open issues that were opened more than 7 days ago : </td> <td>'+ otherIssues +'</td></tr></table>	');
  });
  
   






app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});


function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
		console.log(data);
        res.end();
    });
}

/*
var http = require('http');

var querystring = require('querystring');


var server = http.createServer(function (req, res) {
    switch(req.url) {
		case '/':
			displayForm(res);
		case '/url':
			processForm(req,res);
	}
});

function processForm(req,res){
	   if (req.method == 'POST') {
    console.log("[200] " + req.method + " to " + req.url);
    var fullBody = '';
    
    req.on('data', function(chunk) {
      // append the current chunk of data to the fullBody variable
      fullBody += chunk.toString();
    });
    
    req.on('end', function() {
    
      // request ended -> do something with the data
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      
      // parse the received body data
      var decodedBody = querystring.parse(fullBody);
	console.log(decodedBody);
      // output the decoded data to the HTTP response          
      res.write('<html><head><title>Post data</title></head><body><pre>');
     // res.write(utils.inspect(decodedBody));
      res.write('</pre></body></html>');
      
      res.end();
    });
    
  }


}

server.listen(8080);

/*var http = require('http');

http.createServer(function (req, res) {
    default:
      res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
      console.log("[404] " + req.method + " to " + req.url);
  };
}).listen(8080); // listen on tcp port 8080 (all interfaces)






console.log("[200] " + req.method + " to " + req.url);
  res.writeHead(200, "OK", {'Content-Type': 'text/html'});
  res.write('<html><head><title>Hello Noder!</title></head><body>');
  res.write('<h1>Welcome Noder, who are you?</h1>');
  res.write('<form enctype="application/x-www-form-urlencoded" action="/formhandler" method="post">');
  res.write('Name: <input type="text" name="username" value="John Doe" /><br />');
  res.write('Age: <input type="text" name="userage" value="99" /><br />');
  res.write('<input type="submit" />');
  res.write('</form></body></html');
  res.end();
  break;

*/
console.log("server listening on 8080");
