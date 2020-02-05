# Coursera-UniversyofHK-ServerSideNode


cd /conFusionServer

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



cd /jsonServer

json-server
0.15.1 • Public • Published 5 months ago

JSON Server

Get a full fake REST API with zero coding in less than 30 seconds (seriously)

Created with <3 for front-end developers who need a quick back-end for prototyping and mocking.

    Egghead.io free video tutorial - Creating demo APIs with json-server
    JSONPlaceholder - Live running version
    My JSON Server - no installation required, use your own data

See also:

    🐶 husky - Git hooks made easy
    🏨 hotel - developer tool with local .localhost domain and https out of the box

Sponsors
Gold

Bronze

 

Become a sponsor and have your company logo here
Table of contents

    Getting started
    Routes
        Plural routes
        Singular routes
        Filter
        Paginate
        Sort
        Slice
        Operators
        Full-text search
        Relationships
        Database
        Homepage
    Extras
        Static file server
        Alternative port
        Access from anywhere
        Remote schema
        Generate random data
        HTTPS
        Add custom routes
        Add middlewares
        CLI usage
        Module
            Simple example
            Custom routes example
            Access control example
            Custom output example
            Rewriter example
            Mounting JSON Server on another endpoint example
            API
        Deployment
    Links
        Video
        Articles
        Third-party tools
    License

Getting started

Install JSON Server

npm install

Start JSON Server

json-server --watch db.json

Now if you go to http://localhost:3000/dishes  <-- profit.
