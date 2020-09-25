
//required libraries
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const url = 'mongodb://192.168.8.131:27017'

mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection
function asd() {

connection.db.collection("YourCollectionName", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });

});
db.once('open', () => console.log('connected to db'))

app.get('/', (req, res) => {
    res.sendFile('/Users/---/Documents/GitHub/mongo/index.html')
    console.log()
})

app.get('/a', (req, res)=>{
    const x = coll.find({})
    console.log(x);
})

app.listen(3100, () => console.log('server started'))
