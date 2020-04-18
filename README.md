# Backend-for-React-Native-project


 ### Endpoints and functionality:
 
 




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



# Devlog 
       
## Part 1 :

         * Created a Node module using Express router to support the routes for the products REST API. - done
         * Created a Node module using Express router to support the routes for the promotions REST API. -done 
         * Created a Node module using Express router to support the routes for the leaders REST API. -done 


           Objective 1 

        * The REST API supports GET, PUT, POST and DELETE operations on /products/:dishId end point. -done 


           Objective 2 

         * The new Node module, promoRouter is implemented and used to support the /promotions end point. -done 

         The REST API supports GET, PUT, POST and DELETE operations on /promotions and GET, PUT, POST and DELETE operations on /promotions/:promoId end points. -done 


           Objective 3 

         * The new Node module, leaderRouter is implemented and used to support the /leaders end point. -done 

         The REST API supports GET, PUT, POST and DELETE operations on /leadership and GET, PUT, POST and DELETE operations on /leaders/:leaderId end points. -done

## Part 2 :

        Architecture and REST API and endpoints. - done


           Objectives:

        * Designing the overall architecture of application, from the front-end to the back-end.  apportioned the responsibilities to the front-end and back-end.  - done

        * Design an appropriate REST API that should be supported by server-side. A good design would enable ease of implementation of both the front-end and the back-end and facilitate seamless communication.  - done

        * Decide on the database schemas and the structure of the data, depending upon the database technology to implement the persistence of server-side data  - done

        * Design the business logic to be implemented on the server-side to support the needs of the front-end.  - done

       * Implemented the Promotions schema and model - done

       * Implement a REST API to support the /promotions endpoint, and the /promotions/:promoId endpoint enabling the interaction with the MongoDB database  - done

       * Implemented the Leaders schema and model  - done

       * Implement a REST API to support the /leaders endpoint, and the /leaders/:leaderId endpoint enabling the interaction with the MongoDB database - done


       Task 1 - done
           * The Promotions schema and model correctly supports all the fields as per the example document given above - done
           * The label field is set to an empty string by default - done
           * The price schema is be supported with a new SchemaType called Currency. - done
           * The REST API endpoints /promotions and /promotions/:promoId are implemented to interact with the MongoDB database - done

       Task 2 - done
           * The Leaders schema and model correctly supports all the fields as per the example document given above. - done
           * The REST API endpoints /leaders and /leaders/:leaderId are implemented to interact with the MongoDB database - done

## Part 3 :

       User Authentication

       * Check if a verified ordinary user also has Admin privileges.
       * Allow any one to perform GET operations
       * Allow only an Admin to perform POST, PUT and DELETE operations
       * Allow an Admin to be able to GET all the registered users' information from the database
       * Allow a registered user to submit comments (already completed), update a submitted comment and delete a submitted comment. The user should be restricted to perform such operations only on his/her own comments. No user or even the Admin can edit or delete the comments submitted by other users.


        update all the routes in the REST API to ensure that only the Admins can perform POST, PUT and DELETE operations. Update the code for all the    routers to support this. These operations should be supported for the following end points:


       * POST, PUT and DELETE operations on /products and /products/:dishId
       * DELETE operation on /products/:dishId/comments
       * POST, PUT and DELETE operations on /promotions and /promotions/:promoId
       * POST, PUT and DELETE operations on /leaders and /leaders/:leaderId
    

## Part 4 :

    Backend as a service


        #### BACKEND STUFF #####

        Make sure that when user is created with registration HASH the password in the mongodb. - PASSPORT(Mongoose) Handles   this.

        Admin allowed / able to perform POST, PUT and DELETE operations

        /Admin route will give redirect 403, if you are not logged in as admin 
        https://tylermcginnis.com/react-router-protected-routes-authentication/


    * Allowed users to select a dish as their favorite, and add it to the list of favorites that are saved on the server.
    * Allowed users to retrieve the list of their favorite products from the server
    * Delete one or all of their favorite products from their favorites list on the server.


      * When the user does a GET operation on '/favorites',   populate the user information and the products information before returning the favorites to the user.
      * When the user does a POST operation on '/favorites' by including [{"_id":"dish ObjectId"}, . . ., {"_id":"dish ObjectId"}] in the body of the message,   (a) create a favorite document if such a document corresponding to this user does not already exist in the system, (b) add the products specified in the body of the message to the list of favorite products for the user, if the products do not already exists in the list of favorites.
      * When the user performs a DELETE operation on '/favorites',  delete the list of favorites corresponding to the user, by deleting the favorite document corresponding to this user from the collection.
      * When the user performs a POST operation on '/favorites/:dishId', then   add the specified dish to the list of the user's list of favorite products, if the dish is not already in the list of favorite products.
      * When the user performs a DELETE operation on '/favorites/:dishId', then  remove the specified dish from the list of the user's list of favorite products.
     * A new favoriteSchema and Favorites model has been correctly implemented to take advantage of Mongoose Population support to track the users and the list of favorite products using their ObjectIds in the favoriteSchema and Favorites model.
     * The GET, POST and DELETE operations are well supported as per the specifications above
     * The app.js has been updated to support the new route.

