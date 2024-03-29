const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField : 'email'
},
  function(email,password,done){
    User.findOne({email : email},async function(err,user){
        if(err){
            console.log("Error in finding a user --> Passport"); 
            return done(err);
        }
        if(!user || user.password != password){
            console.log("Invalid UserName/Password");
            return done(null,false);
        }
        return done(null,user);
    });
  }

));


passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding a user --> Passport"); 
           return done(err);
        }
        return done(null,user);
    });
});


passport.checkAuthentication = function(req,res,next){

    if(req.isAuthenticated()){
        console.log("authenticated");
        return next();
    }
    console.log('not authenticated');
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        console.log(req.user);
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;