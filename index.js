const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const bodyParser = require('body-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const dp = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());



app.use(expressLayouts);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name : 'REVIEW',
    secret : 'something',
    saveUninitialized : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1/review'
    })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log('error in port',err);
    }
    console.log("port successfully connected");
});