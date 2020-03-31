# Backend-for-React-Native-project

# Make sure to check baseURLS in each project matches the exposed URL :) 

    https://github.com/xAirx/Coursera-UniversityofHK-ReactNative/blob/master/ReactNative/confusion/shared/baseurl.js


    https://github.com/xAirx/Coursera-UniversityofHK-React/blob/master/confusion/src/shared/baseUrl.js
    
    
    --------- HOSTING --------
    
    https://medium.com/make-school/how-to-deploy-your-node-js-mongodb-app-to-the-web-using-heroku-63d4bccf2675 


# cd /conFusionServer

    ------ Starting up -------
    
    
    npm install

    yarn start
    


    TODO: ----------MongoDB----------
    
    
    TODO: Access with commandline   
    commandline: 
    
    https://docs.mongodb.com/manual/mongo/
    
    
    
    TODO: Access with mongoDBAtlas:
    
    
    TODO: https://geekflare.com/getting-started-mongodb/
    
    
    
    
    
    
    //// CONNECT TO MONGOOSE SERVER ////
    const mongoose = require('mongoose');

    const Dishes = require('./models/dishes');

    const url = 'mongodb://localhost:27017/conFusion';
    const connect = mongoose.connect(url);

    connect.then((db) => {
      console.log("Connected correctly to server");
    }, (err) => { console.log(err); });

    /////////////////////////////////// 



    --------Basic authentication-------- 

  
        http://localhost:3000

          if (user == 'admin' && pass == 'password') {
            next(); // authorized
          } else {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
          }
        }




    TODO: ----------Improvements------
    
    READUP + Notes in onenote, and add funtionality from week 4.
    
    https://evdokimovm.github.io/javascript/nodejs/mongodb/expressjs/2016/07/17/Connect-Save-and-Find-Data-in-MongoDB-with-NodeJS-and-ExpressJS.html
    
    https://www.coursera.org/learn/server-side-nodejs/home/week/1
    https://www.coursera.org/learn/server-side-nodejs/home/week/2
    https://www.coursera.org/learn/server-side-nodejs/home/week/3
    https://www.coursera.org/learn/server-side-nodejs/home/week/4
    
    

    TODO: ------------ Endpoints --------------
    
    
    You can now play with endpoints:
    
    
    
    
    
    
    
    --------------------------------------------
    
  


# cd /jsonServer


    Getting started

    Install JSON Server
    
    npm install -g json-server
    
    
    

    Start JSON Server

    json-server --watch db.json

    Now if you go to http://localhost:3000/dishes  <-- profit.
