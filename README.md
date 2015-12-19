# TestShippable


This project consists a form.html to display the first web page. When url is entered, the response is a table with entries and their respective numbers as:

- Total number of open issues : 
- Number of open issues that were opened in the last 24 hours : 
- Number of open issues that were opened more than 24 hours ago but less than 7 days ago : 
- Number of open issues that were opened more than 7 days ago : 

This app is in Node JS, with dependencies : express, cheerio, type-of-is, body-parser & request. 

App is deployed on Heroku. App link: https://test-shippable1.herokuapp.com

In server.js, first a GET call is made to display the form. On submitting this form it triggers a POST call which displays the output as above. In POST call, using Request, Jquery and Cheerio, html page of the passed URL is parsed. 

Given more time, I can make changes in the UI of form and response and add more checks and boundary cases to handle any exception. 
