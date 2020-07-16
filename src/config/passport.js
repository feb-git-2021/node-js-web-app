const passport= require('passport')
require('./strategies/localstrategy')()

 

module.exports=function passportConfig(app){
    app.use(passport.initialize()) //passort sets itself for the request
    app.use(passport.session()) //this build the session up

    passport.serializeUser((user,done)=>{
        done(null,user)
    })

    passport.deserializeUser((user,done)=>{
        done(null,user)
    })

    
}