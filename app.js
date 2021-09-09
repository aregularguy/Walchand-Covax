const path =require('path')
const express = require('Express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')


const connectDB = require('./config/db')
const { Mongoose } = require('mongoose')

// Load Config

dotenv.config({ path : './config/config.env'})


//passport config
require('./config/passport')(passport)

connectDB();


const app = express()


if(process.env.NODE_ENV=== 'development'){
    app.use(morgan('dev'))
}
//HandleBars
app.engine('.hbs',exphbs({defaultLayout: 'main' , extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store:  MongoStore.create({mongoUrl: `mongodb://arshad123:arshad123@cluster0-shard-00-00.ov8e5.mongodb.net:27017,cluster0-shard-00-01.ov8e5.mongodb.net:27017,cluster0-shard-00-02.ov8e5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ohy7qz-shard-0&authSource=admin&retryWrites=true&w=majority`,})
    
    })
  )




// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//Static Folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))



const PORT= process.env.PORT || 3000


app.listen(
    PORT,
     console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
     
     )

