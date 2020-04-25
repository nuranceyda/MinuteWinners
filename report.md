# Final Report

## Project Description

## Intended Audience

## Technologies

Our project had two components, the front end and the back end, and each required different technologies to be used. 

### Front End

For our front end, we decided to make a webpage using jquery as our primary visual framework. The reason for this is because our app is very visually minimalistic, so we had no need for a more powerful front end frame work. We also interacted with the accelerometer for our front end, and we used the built in HTML5 API to access this data. We leveraged the HTML5 text to speech API to narrate instructions for our users. Lastly, in order to connect our front end to our back end, we used the Express.js framework to allow us to send message packets between the front end and back end. We had different listeners set up in our front end and back end to listen and respond to these packets.

### Back End

Our back end is responsible for managing all of our players and launching new game events on a regular schedule. We use Express.js to manage our messaging and allow us to send and receive messages from client devices. We use a simple hash map to assign each player ID to a value containing their score.

## Deployment

Because we are using Express.js, a node js framework, we had to host a server that could run node js code for us. For us, since we had a very lightweight server, we decided to run our app on the free tier for heroku. We hosted our node js app on heroku, and set up automatic deployments to rebuild our app every time we made a new commit. We also served our front end from this same URL to reduce the amount of problems we got with Express.js.

## Problems Encountered

## Future Goals
