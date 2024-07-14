# Project Context
Project started to gain an understanding of how to use React, Node and MongoDB

# How to run the app
to run

go into backend folder - 
in terminal - start node server.js

go into frontend folder
in terminal - npm start

To turn off mongoDB service
win r, services.msc, MongoDB Server


# Planning of the project
Overall Structure of the project for user sequence

Register
Requires email verification
Send user Data (with hashed password) to mongo DB

Login
Compare login with existing user data
decryp password and see if its the same
if correct go to dashboard

Dashboard
Show conversations with every friend with user
show latest chat with friend
add friends through add friend functionality - check DB for user - add friend to user friend list
click on chat to open specific chat

Specific chat
retrieve all chats with the person

# Further features after core functionalities are implemented
Voice chat
Group chats
image sending


# Structure of Code
The user interacts with the front end react application running on localhost:3000

When the react frontend needs data or needs to save data, it makes HTTP requests to the backend node server running on localhost:5000
The backend (Node.js with Express) will listen for incoming requests on localhost:5000 
route handlers like app.get and app.post define how it should respond to different types of requests

The backend receives a request that involves data storage or retrieval, it interacts with MongoDB using Mongoose



# Database Structure
Mongo DB Collections
User table
UserID username password email phonenum friends(friend ID array) createdAt updatedAt

Friends table
FriendID user1 user2 status(pending, approved, blocked) createdAt updatedAt

Chats table
ChatID senderID receiverID message(string of text) timestamp

# Checking console logs
press f12 on the app open in order to see errors that are occuring between the data tranmissions

# NPM updating
npm outdated
npm update

npm audit fix : low and moderate vulnerabilities
npm audit fix --force : high and critical vulnerabilities
