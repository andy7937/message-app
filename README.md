# Project Context
Project started to gain an understanding of how to use React, Node and MongoDB

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

Spcific chat
retrieve all chats with the person



# Database Structure
Mongo DB Collections
User table
UserID username password email phonenum friends(friend ID array) createdAt updatedAt

Friends table
FriendID user1 user2 status(pending, approved, blocked) createdAt updatedAt

Chats table
ChatID senderID receiverID message(string of text) timestamp




# How to run the app
to run

go into backend folder
in terminal - node server.js

go into frontend folder
in terminal - npm start

To turn off mongoDB service
win r, services.msc, MongoDB Server