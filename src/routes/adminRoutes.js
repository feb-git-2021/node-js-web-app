const express=require('express')
const adminRouter=express.Router()
//const mongClient=require('mongodb').MongoClient  //old style
//OR
const {MongoClient}=require('mongodb')  //modern style
const debug=require('debug')('app:adminRoutes')

let books =[ 

    { 
    
        title: 'War and Peace', 
    
        genre: 'Historical Fiction', 
    
        author: 'Lev Nikolayevich Tolstoy', 
    
        read: false 
    
    }, 
    
    { 
    
        title: 'Les Misérables', 
    
        genre: 'Historical Fiction', 
    
        author: 'Victor Hugo', 
    
        read: false 
    
    }, 
    
    { 
    
        title: 'The Time Machine', 
    
        genre: 'Science Fiction', 
    
        author: 'H. G. Wells', 
    
        read: false 
    
    }, 
    
    { 
    
        title: 'A Journey into the Center of the Earth', 
    
        genre: 'Science Fiction', 
    
        author: 'Jules Verne', 
    
        read: false 
    
    }, 
    
    { 
    
        title: 'The Dark World', 
    
        genre: 'Fantasy', 
    
        author: 'Henry Kuttner', 
    
        read: false 
    
    }, 
    
    { 
    
        title: 'The Wind in the Willows', 
    
        genre: 'Fantasy', 
    
        author: 'Kenneth Grahame', 
    
        read: false 
    
    }, 
    
    { 
    
        title: 'Life On The Mississippi', 
    
        genre: 'History', 
    
        author: 'Mark Twain', 
    
        read: false 
    
    }, 
    
    { 
    
        title: 'Childhood1234', 
    
        genre: 'Biography', 
    
        author: 'Lev Nikolayevich Tolstoy', 
    
        read: false 
    
    } 
    
    ] 

function router(nav){
    adminRouter.route('/')
    .get((req,res)=>{
       // res.send('Inserting Books into MongoDB')
       const url ='mongodb://localhost:27017'
       const dbName='booksdb';
       (async function mongo(){
           let client
           try{
               client = await MongoClient.connect(url)
               debug('Connected to mongodb server.....')
               const db = client.db(dbName)
               const response = await db.collection('books').insertMany(books)
               res.json(response)
           }catch(err){
               debug(err.stack)
           }
           client.close()
       })()
    })
    return adminRouter
}

module.exports=router