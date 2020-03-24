# Coursera-UniversyofHK-ServerSideNode

# Make sure to check baseURLS in each project matches the exposed URL :) 

    https://github.com/xAirx/Coursera-UniversityofHK-ReactNative/blob/master/ReactNative/confusion/shared/baseurl.js


    https://github.com/xAirx/Coursera-UniversityofHK-React/blob/master/confusion/src/shared/baseUrl.js


# cd /conFusionServer

    npm install

    yarn start


    Basic authentication 


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



# cd /jsonServer


    Getting started

    Install JSON Server
    
    npm install -g json-server
    
    
    

    Start JSON Server

    json-server --watch db.json

    Now if you go to http://localhost:3000/dishes  <-- profit.
