
const express = require('express')
const app = express()
//mongo
const MongoClient = require('mongodb').MongoClient
const mongoUrl = "mongodb://192.168.8.131:27017"

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))

 MongoClient.connect(mongoUrl, {},  (err, client)=>{
  if (err) return console.error(err)
  console.log('Connected to Database')
  const  db =  client.db('baza-danych')
})

const inputsCollection = this.db.collection('inputs')

app.post('/inputs', (req, res) => {
    inputsCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
  })
  app.get('/inputs', (req,res) =>{
    res.send(inputsCollection.find().pretty())
  })

app.listen(3005, function(){
  console.log('Listening on 3005')
})

app.get('/', (req, res) =>{
  // res.send('Hello')
  res.sendFile('/Users/---/Documents/GitHub/mongo/index.html')
})


app.post('/test', (req, res)=>{
  console.log(req.body)
})
app.get('/test', (req, res)=>{
  

})

