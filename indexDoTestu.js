
//required libraries
const express = require('express')
const app = express()
const mongoose = require('mongoose')
//schema
const asd = require('./asdSchema')

const url = 'mongodb://192.168.8.131:27017'

mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection

// asd.create({asd: 111})

const coll = db.collection('testowa')
db.once('open', () => console.log('connected to db'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    console.log()
    console.log(coll.find())
})


app.get('/a', (req, res)=>{
    asd.find({}, (err, result) =>{
        res.send(result)
    })
})

app.listen(3100, () => console.log('server started'))
