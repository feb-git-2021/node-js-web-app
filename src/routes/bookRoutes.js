const express= require('express')
const bookRouter= express.Router();
const {MongoClient,ObjectID} = require('mongodb')
const debug = require('debug')('app:bookRoutes')

function router(nav){
    //To prevent books and book.ejs page unless you sign In
    bookRouter.use((req,res,next)=>{
        if(req.user){
            next()
        }else{
            res.redirect('/')
        }
    }) 
    title='BooksApp'


    bookRouter.route('/')
    .get((req,res)=>{
        const url='mongodb://localhost:27017'
        const dbName='booksdb';
        (async function mongo(){
            let client;
            try{
                client=await MongoClient.connect(url)
                debug('Connected to the MongoDb server...')
                const db=client.db(dbName)
                const col = await db.collection('books')
                const books= await col.find().toArray()
                res.render('books',{
                nav,
                title,
                books
                })
            }catch(err){
                debug(err.stack)
            }
            client.close()

        })();

  // res.send('This is books page')



})

bookRouter.route('/:id')
.get((req,res)=>{

    //const id =req.params.id
//OR
   const{id}=req.params
   const url='mongodb://localhost:27017'
   const dbName='booksdb';
   (async function mongo(){
    let client;
    try{
        client=await MongoClient.connect(url)
        debug('Connected to the MongoDb server...')
        const db=client.db(dbName)
        const col = await db.collection('books')
        const book = await col.findOne({_id:new ObjectID(id)})
        debug(book)
        res.render(
            'book',
            {
            nav,
            title:'Book Details',
            book
        }) 
        
        
    }catch(err){
        debug(err.stack)
    }
    client.close()

})()



  
})
return bookRouter
}

module.exports= router