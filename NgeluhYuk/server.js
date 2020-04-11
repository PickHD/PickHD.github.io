//!import library
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()
const app = express()

//!import authentication
const Auth = require('./middleware/auth')

//!connecting to mongodb atlas (cloud server AWS)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONN,{ //? <== connection string saved in .env
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>console.log(`MongoDB Connected !`)) //? <== check if connect
.catch((err)=> console.log(err))  //? <== if not show error in console

//!import routes
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const indexRoutes = require('./routes/indexRoutes')


//!set view engine handlebars (.hbs)
app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',exphbs({extname: 'hbs',defaultLayout:'indexLayout',layoutDir:__dirname+'/views/layouts/'}))
app.set('view engine','hbs')

//!importing more library
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({secret:process.env.SECRET_SESSION,resave:true,saveUninitialized:true})); //? <==saved in .env
app.use(cookieParser())

//!middleware
app.use('/',indexRoutes) //? <== index
app.use('/user', userRoutes) //? <== reg or login  or logout
app.use('/home',Auth.check_login, postRoutes) //? <== list (authenticated)


//!server listening on port 5000
app.listen(5000, () => console.log(`Server is Running !`))