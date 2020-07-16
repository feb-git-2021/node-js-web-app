const express= require('express')
const chalk = require('chalk')
const bodyParser= require('body-parser')
const passport = require('passport')
const cookieParser= require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const path =require('path')

let app =express()

const port =process.env.PORT || 4000



//implementing router using express

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

app.use(session(
    {secret:'temp1234',
    resave: true,
    saveUninitialized: true
}))

require('./src/config/passport.js')(app)


//DEMO MIDDLEWARE
// app.use((req,res,next)=>{
//     debug('TEST Middleware')
//     next()

// })

app.use(express.static(path.join(__dirname,'/public')))

//setting path for templating engines
app.set('views','./src/views')
app.set('view engine','ejs')

const nav =[
    {link:'/books',title:'Books'},
    {link:'/authors',title:'Authors'}
]

const bookRouter=require('./src/routes/bookRoutes')(nav)
const adminRouter=require('./src/routes/adminRoutes')(nav)
const authRouter=require('./src/routes/authRoutes')(nav)


const debug=require('debug')('app')

app.use('/books',bookRouter)
app.use('/admin',adminRouter)
app.use('/auth',authRouter)

app.get('/',(req,res)=>{
    res.render(
'index',
{
    nav,
    title:'LibraryApp'
}
    )
})







// app.get('/pug',(req,res)=>{
//     res.render('index',{title:'Web App with Node and Express'})
// })
// app.get('/names',(req,res)=>{
//     res.render('index',{persons:['David','Allan','Joe','Smith']})
// })

app.listen(port,()=>{
    debug(`Express Server listening on port ${chalk.blueBright(port)}..... `)
})