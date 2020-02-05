# Coursera-UniversyofHK-ServerSideNode

<<<<<<< HEAD
cd /conFusionServer
=======

# cd /conFusionServer
>>>>>>> 63f66aa2c1bccfab97ec7202f69f5cbfbef49d73

    npm install

<<<<<<< HEAD
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
=======
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
>>>>>>> 63f66aa2c1bccfab97ec7202f69f5cbfbef49d73
