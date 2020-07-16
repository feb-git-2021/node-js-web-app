const passport=require('passport')
const {Strategy} =require('passport-local')
const {MongoClient} = require('mongodb')
const debug=require('debug')('app:localStrategy')
 

module.exports=function localstrategy(){
    passport.use(new Strategy({
        usernameField:'username',
        passwordField:'password'
    },(username,password,done)=>{
        const url='mongodb://localhost:27017'
        const dbName='booksdb';
        (async function addUser(){
            let client;
            try{
                client=await MongoClient.connect(url)
                debug('Connected to the MongoDb server...')
                const db=client.db(dbName)
                const col = await db.collection('users')
                //now find the user associated with our login
                const user = await col.findOne({username})
                if(user.password === password){
                    done(null,user)
                }else{
                    done(null,false)
                }             
                
            }catch(err){
                debug(err)
            }
            client.close()
        })()
       
        
    }
    ))
}