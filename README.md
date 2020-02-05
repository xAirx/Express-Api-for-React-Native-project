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
