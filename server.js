const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users=require('./routes/api/users');
const userprofile=require('./routes/api/userprofile');
const offres =require ('./routes/api/offres');
const newsletterRoute = require('./routes/api/newsletter');
//const postuleRoute = require('./routes/api/postule');
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;
const expressListRoutes = require('express-list-routes');

mongoose
  .connect(db,{
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('mongo is successfully Connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/users',users);
app.use('/api/userprofile',userprofile);
app.use('/api/offres',offres );
app.use('/api/newsletter', newsletterRoute);
//app.use('/api/postule', postuleRoute);



  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });

const port=process.env.PORT || 5000;

app.listen(port,()=> console.log('server running on ${port}'));
expressListRoutes(app);


