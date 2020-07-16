const express = require('express')
const {MongoClient} = require('mongodb')
const passport = require('passport')
const debug = require('debug')('app:authRoutes')
const authRouter= express.Router()



function router(nav){
    authRouter.route('/signUp')
    .post((req,res)=>{
       // debug(req.body)
        //Create User Now
        const {username,password} =req.body
        const url='mongodb://localhost:27017'
                const dbName='booksdb';
                (async function addUser(){
                    let client;
                    try{
                        client=await MongoClient.connect(url)
                        debug('Connected to the MongoDb server...')
                        const db=client.db(dbName)
                        const col = await db.collection('users')
                        const user ={username,password}
        
                       // insert one user
                        const results = await col.insertOne(user)
                        debug(results)
                        req.login(results.ops[0],()=>{
                            res.redirect('/auth/profile') //auth/profile is going to tell that user is created
                        })
                    }catch(err){
                        debug(err)
                    }
        
                })()

       
        // res.json(req.body)
        
      
    })
    authRouter.route('/signIn')
    .get((req,res)=>{
        res.render('signIn',{
            nav,
            title: 'Sign In Here!'
        })
    })
    .post(passport.authenticate('local',{
        successRedirect:'/auth/profile',
        failureRedirect:'/'
    }))
    authRouter.route('/profile')
    .all((req,res,next)=>{
        if(req.user){
            next()
        }else{
            res.redirect('/')
        }
    })
    .get((req,res)=>{
        res.json(req.user)
        debug(req.user)
    })
    
    return authRouter
}

//WITH DATABASE

/*
                //
        debug(req.body)
        //CREATING A USER
        req.login(req.body,()=>{
            res.redirect('./auth/profile')
        })

    })*/
  
    

module.exports=router

