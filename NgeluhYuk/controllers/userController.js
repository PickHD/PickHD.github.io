//!import library and function 
const bcrypt = require('bcrypt')
const {registerValidation,loginValidation} = require('../validation')

let session_store

//!import model
User = require('../models/User')

//! exports route get "/register","/login","/logout"
exports.indexRegister = (req,res,next)=>{
    res.render('user/register',{ 
        viewTitle:"Register Form"
    })
}
exports.indexLogin = (req,res,next)=>{
    res.render('user/login',{
        viewTitle:"Login Form"
    })
}
exports.logout = (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
          console.log(err);
        }
        else{
          res.redirect('/');
          console.log('log out!')
        }
    })
}

//! exports route post "/register","/login"
exports.newRegister = (req,res,next)=>{
     addUser(req,res) //? <== separated by function
}
exports.newLogin = async (req,res,next)=>{
    session_store = req.session;

    const {error} = loginValidation(req.body)
    if(error) return res.render('user/login',{
        viewTitle:"Login Form",
        showError:true,
        Error:error.details[0].message
    })

    //!checking if the username exists
    const user = await User.findOne({username:req.body.username})
    if(!user) return res.render('user/login',{
        viewTitle:"Login Form",
        showError:true,
        Error:"Username tidak ditemukan"
    })

    //!checking if password is CORRECT
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.render('user/login',{
        viewTitle:"Login Form",
        showError:true,
        Error:"Password salah,coba Lagi !"
    })

    if (user && validPass)
    {
        session_store.logged_in = true;

        res.redirect('/home')
        console.log('success')
    }
    else 
    {
        res.render('user/login',{
            viewTitle:"Login Form",
            showError:true,
            Error:"Error, mohon coba lagi!"
        })
    }

   
}

//!function adding a user
async function addUser(req,res){
    //!validate the data first before we a user
    const {error} = registerValidation(req.body)
    if(error) return res.render('user/register',{
        viewTitle:"Register Form",
        showError:true,
        userError:error.details[0].message
    })
   
    //!check if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist)  return res.render('user/register',{
        viewTitle:"Register Form",
        userError:"email sudah dipakai"
    })

    //!hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    const user = new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:hashPassword
    })
    try{ //!save user
        const savedUser= await user.save()
        res.redirect("/user/login");
       
    }catch(err){//!if error
       console.log(err)
    }
}

