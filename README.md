# Coursera-UniversyofHK-ServerSideNode

# Start json server to make API work for website and app..

cd /conFusionServer
=======

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

    npm install

    Start JSON Server

    json-server --watch db.json

    Now if you go to http://localhost:3000/dishes  <-- profit.
