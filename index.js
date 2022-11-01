const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app =express()
const cors = require('cors');
const port =process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())

// user: dbuser2
// pssword: Q0P3krStlfOZb8Ix


const uri = "mongodb+srv://dbuser2:Q0P3krStlfOZb8Ix@cluster0.c5dej4c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// async function
const run = async()=>{
   try{
        const userCollection=client.db('nodeMongoCrud').collection('users');

        // Read method ba server theke add krito data niye asha
        app.get('/users', async (req,res)=>{
            const query={};
            const cursor= userCollection.find(query);
            const users=await cursor.toArray();
            res.send(users);
        })



        // create method ba client side theke data niye server e pathano
       app.post('/users',async (req,res)=>{
           // req er vitor body te clint side theke user ke pathano hoy .
           // tai ekhane amra req.body theke user nibo.
        user=req.body;
        console.log(user)
        const result =await userCollection.insertOne(user)
        console.log(result)
        res.send(result)
       })


       //delete user method 
       // search mongodb crud node.js > usage example> delete a document
       app.delete('/users/:id',async (req,res)=>{
         const id=req.params.id;
         // specially korte hobe. {} empty dile sobaike delete kore dibe;
         //const { ObjectId } = require('mongodb'); obossoi import korte hobe.
         const query={_id: ObjectId(id)}
         console.log(`triying to delete id `,id)
         const result=await userCollection.deleteOne(query)
         console.log(result);
         res.send(result)
       })
   }
   finally{

   }
}
run().catch(error=>console.log(error))

app.get('/', (req,res )=>{
    res.send('hello from mongo crud server')
})

app.listen(port, ()=>{
    console.log(`listen to port ${port}`)
})