# TeamKraken
TeamKraken's Project Repo

## Overview ##

InstaView enables users to input a starting and end point then receive the fastest route based on their method and all instagram posts made within the last hour along that route. 

It is a great way to provide users with a visualization of their route and interesting things happening on that route just before they head out.

Simply visit https://stark-inlet-7984.herokuapp.com to use the application.

## Installation ##

To work on the source code, after cloning the repo you must npm & bower install. 
To start your local server enter into the bin folder and enter DEBUG=server npm start

## API Reference ##

We utilized both GoogleMaps and Instagram APIs. You do not need an API key for GoogleMaps but you will need an Instgram API key to see the images on the route. If you do not currently have one you can apply for one here: https://instagram.com/developer/?hl=en

For Instagram you will need a client ID and client secret.

You must create a config.js file within the instatrip folder and insert the below into it + your keys:
module.exports = {
  InstaClientID: 'INSERT HERE',
  InstaClientSecret: 'INSERT HERE'
}

