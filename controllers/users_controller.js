
const User = require('../models/user');

module.exports.signIn = (req,res) => {
    return res.render('user_sign_in',{
        title : "sign In"
    })
}

module.exports.signUp = (req,res) => {
    return res.render('user_sign_up',{
        title : "Sign Up"
    })
}

module.exports.create =  async (req,res) => {

    try{

        const { username, email, password, confirm_password, role } = req.body;

        console.log(req.body);

        if(password != confirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({'email' : email});

        if(!user){
            await User.create({
                'email' : email,
                'password' : password,
                'username' : username,
                'role' : role
            })
            return res.redirect('/');
        }else{
            return res.redirect('back');
        }


        



    }
    catch(err){
    console.log('error', err);
    return res.redirect('back');

    }

}


module.exports.createSession = (req,res)=>{

    if(req.user.role == 'admin'){
        return res.redirect('/admin-dashboard');
    }
    return res.redirect(`/employee-dashboard/${req.user.id}`);
}


module.exports.destroySession = async (req,res) => {
    try{
    let emp_id = req.params.id;

    let user = await User.findById(emp_id);

    if(!user){
        return res.redirect('/');

    }

    await User.findByIdAndDelete(emp_id);

    return res.redirect('back');





    }catch(err){
        console.log('error', err);
        return res.redirect('back');

    }

}

module.exports.destroySessio = (req,res,next) => {
    req.logout(function(err){
        return next(err);
    });
    return res.redirect('/');
}