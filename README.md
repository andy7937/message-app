# Project Context
Project started to gain an understanding of how to use React, Node and MongoDB and ultimately how to incorporate each framework with each other  


# How to run the app
To run app on local (use old github repo)
go into backend folder in terminal - start node server.js  
go into frontend folder in terminal - npm start  

To turn off mongoDB service  
win r, services.msc, MongoDB Server  

To run app on heroku/netlify
make sure to be in backend
to push to heroku
git add .
git commit -m "Initial commit"
heroku git:remote -a message-app (if not already git initialised)
git push heroku master

make sure to be in frontend
npm run build

MongoDB atlas to check database
netify to update frontend
heroku to update backend 

# Planning of the project
Overall Structure of the project for user sequence  

Register  
Requires email verification  
Send user Data (with hashed password) to mongo DB  

Login  
Compare login with existing user data  
decrypt password and see if its the same  
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
image sending  
email verification when registering  
encryption of messages
unfriending


# End to End/full-stack workflow
The user interacts with the front end react application running on localhost:3000  
  
When the react frontend needs data or needs to save data, it makes HTTP requests to the backend node server running on localhost:5000  
The backend (Node.js with Express) will listen for incoming requests on localhost:5000   
route handlers which use post and get will pick up these calls and send it to the correct controller class.  

The backend receives a request that involves data storage or retrieval, it interacts with MongoDB using Mongoose  

From there, the controller will process the data, get any data needed, and then send any data back to the frontend  


Example using the input system in the registration form:  
Inputs are made on the registraion.js in the frontend react  
axios.post 'http://localhost:5000/api/users/register' this line of code will send the info to the backend server at the specified URL  
app.use('/api/users', userRoutes); The Express server routes the incoming request to the appropriate route handler. In this case, it directs requests to /api/users to userRoutes.js  
router.post('/register', userController.registerUser); The router receives the request and matches it to the /register route. It then calls the registerUser method from the userController to handle the request.  
in the registerUser class, it will process the data (saving the user using the User schema), and then send a response back to the resgister.js saying the process either succeeded or failed  


# Database Structure
Mongo DB Collections  
User table  
UserID username password email phonenum friends(friend ID array) createdAt updatedAt  

Chats table  
ChatID senderID receiverID message(string of text) timestamp  

# Checking console logs
press f12 on the app open in order to see errors that are occuring between the data tranmissions  

# NPM updating
npm outdated  
npm update  

npm audit fix : low and moderate vulnerabilities  
npm audit fix --force : high and critical vulnerabilities  
