//! ----DUMMY----
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
User = require('../models/User')

const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash('reverseit',salt)


mongoose.Promise = global.Promise;
//!connecting to mongodb atlas (cloud server AWS)
mongoose.connect(process.env.DB_CONN,{ //? <==connection string saved in .env
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>console.log(`MongoDB Connected !`)) //? <== check if connect
.catch((err)=> console.log(err))  //? <== if not show error in console


User.find({username:'superadmin'}, (err, user)=>{
    if (user.length == 0)
    {
        const admin = new User({
            name:'admin',
            username: 'superadmin',
            email: 'admin@admin.com',
            password: hashPassword,
            admin: true,
        });

        admin.save(function(err) {
          if (err) throw err;
          console.log('Admin is created!');
        });
    }
});

User.find({username:'supermember'},  (err, user)=>{
    if (user.length == 0)
    {
        const member = new User({
            username: 'supermember',
            email: 'member@gmail.com',
            password: hashPassword,
            admin: false,
        });

        member.save(function(err) {
          if (err) throw err;

          console.log('Member is created!');
        });
    }
});
