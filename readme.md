## MERN Blog Application 🚀🚀🚀

⚠ **Update 3rd April 2021** : React and NodeJS packaged updated/fixed using `npm audit`, Packages updated may have breaking changes, If running the code in this repo causes any issues, send me an e-mail ⚠

Minimalistic, ready-to-use component for Sessions based Login and Sign-Up using Reactjs, Redux, Bootstrap Node.js + Express and MongoDB, can be used as a starting point for another project that needs authentication.

## Features

- Login page with success/error messages
- Register page with success/error messages
- Protected Profile, Create Post,Comment Post,Delete Post,Followed User Post route that needs authentication to access
- Persistence achieved using Sessions, with session ID stored on Local Storage
- Logout deletes session in database and cookie from browser


## Prerequisites

- Node.js
- NPM
- React
- MongoDB Atlas MongoURI



Install packages for Node backend

```
 cd ./server
 npm install
 npm install -g nodemon
```

Start Server

```
 nodemon app
```


Install packages for React client

```
 cd ./client
 npm install
```

To Test Locally

run inside client ```npm start```


Backend endpoints:

```
/signup
/signin
/reset-password
/new-password
/allpost (Required Login)
/getsubpost (Required Login)
/createpost (Required Login)
/mypost (Required Login)
/comment (Required Login)
/deletepost/:postId (Required Login)(Can only delete own created post)
/user/:id (Required Login)
/follow (Required Login)
/unfollow (Required Login)
/updatepic (Required Login)
/search-users
```



