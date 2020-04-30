# Final Report

## Project Description
MinuteWinners is a project created by Nuran Golbasi, Nikhil Komirisetti, and Kevin Lane. MinuteWinners is a web browser mobile game designed specifically for children with visually impairments to be played on smartphones or tablets. The goal of MinuteWinners is to allow for multiple friends to play games together easily and remotely! The game server rotates between three different games every minute. Players can join at any time and will be entered into the next game once the current one is finished. After each round, the highest scoring player's animal character name is announced, following by your own score. This way you can have friendly competition with others playing the game!
The three games in rotation are intended to provide healthy exercise and focus by involving the use of accelerometers in every smartphone. The game can be accessed anytime from the following link: https://minute-winners.herokuapp.com/
You will be playing the game with anyone else currently connected via that think.
There is native device text-to-speech that plays once the user selected "Start" that provide instructions for each game!

## Intended Audience
The intended audiences for this game are children ages 6 to 16 who have any degree of visual impairment. Although, this game is fun for everyone! 
## Technologies

Our project had two components, the front end and the back end, and each required different technologies to be used. 

### Front End

For our front end, we decided to make a webpage using jQuery as our primary visual framework. The reason for this is because our app is very visually minimalistic, so we had no need for a more powerful front end frame work. We also interacted with the accelerometer for our front end, and we used the built in HTML5 API to access this data. We leveraged the HTML5 text to speech API to narrate instructions for our users. Lastly, in order to connect our front end to our back end, we used the Express.js framework to allow us to send message packets between the front end and back end. We had different listeners set up in our front end and back end to listen and respond to these packets.

### Back End

Our back end is responsible for managing all of our players and launching new game events on a regular schedule. We use Express.js to manage our messaging and allow us to send and receive messages from client devices. We use a simple hash map to assign each player ID to a value containing their score. Using the accelerometer API, we were able to collect the player's movement data and transform it into scores for each player using a few algebraic formulas. 

## Deployment

Because we are using Express.js, a node js framework, we had to host a server that could run node js code for us. For us, since we had a very lightweight server, we decided to run our app on the free tier for heroku. We hosted our node js app on heroku, and set up automatic deployments to rebuild our app every time we made a new commit. We also served our front end from this same URL to reduce the amount of problems we got with Express.js.

## Problems Encountered
We first encountered issues with our text-to-speech API. Most modern browsers, including Chrome and Safri, have disabled any “auto-play” of noise from website. This means that we are unable to generate text-to-speech or music without user interaction. To address this issue, we added the full page “Start” button, which allows confirmed user interaction for text-to-speech and music with a simple tap of their screen. We found that we need to load all the music assets statically at the beginning of the game, as opposed to loading them between each game. This decreased latency for the music to begin playing since it was already buffered.
Another issue we encountered was certain mobile devices were unable to interact with the “Start” button. We discovered this was because the website was directing some users to http instead of https. This was solved by forcing https connections for anyone visiting our game. 
We also fixed timing issues that caused music and text-to-speech to be cut off before their full duration. This seemed to be a problem in loading the audio assets on certain devices, but allowing more time before switching between games helped allow for the music to be ready when the server switched to a new game. 

## Future Goals
We hope to further increase the interaction between users. We want to add the possibility to send auditory emotes to everyone in the game during the Waiting Room. We are also looking for ways to allow users to talk to each other between games, but there have been concerns to ensure the website stays kid friendly.
We also want to develop more games to add to the rotation. We are exploring the option for an auditory “Fruit Ninja” game that allows players to hear an auditory cue and swipe their phone in that direction to slice the fruit. 
