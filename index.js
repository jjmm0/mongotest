let serverNumber
const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017'
const http = require('http')
const db = require('mongodb')

// http.createServer().listen(1234, err =>{
//     if(err){
//         console.log(`error ${err}`)
//     }
//     else{console.log('jest git')}
// })

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true },  err => {
//     if(err){
//         console.log('error ' + err)
//     }
//      console.log('connected')
// })
connect()
async function connect(){
    const client = new db.MongoClient(mongoUrl)
    try{
        await client.connect()
        const database = client.db('testDB')

        const coll = await database.collections()
        console.log(coll)
        coll.forEach(c => console.log(c.collectionName));
    }   
    catch (ex){
        console.log(`error = ${ex}`)
    }
    finally{
        // client.close()
    }
}