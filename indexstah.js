require('./mongodb/mongoose');
const User = require('./mongodb/models/user');
const Message = require('./mongodb/models/message')
const Post = require('./mongodb/models/post')
const Rank = require('./mongodb/models/rank')

const app = require('express')();
const http = require('http').createServer(app)
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io')(http)

const port = process.env.PORT || 3001;
const IP = '192.168.2.2';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


http.listen(port, IP, (err) => {
    if(err)
    {
        console.log(err);
    }
    console.log(`Listening at http://${IP}:${port}`);
});



app.post('/login', (req, res) => {
    console.log(req.body.Login + req.body.Password)
    if(req.body.Login == "es" || req.body.Password == "es")
    {
        res.status(200).end();
    }
})

app.post('/register', (req, res) => {
    if(req)
    {
        console.log("Ktos chce sie zarejestrować!");
            User.findOne({Login: req.body.newLogin}, (err, result) => {
            if(err)
            {
                res.status(400).end();
                console.log(err);
            }
            else if(result)
            {
                res.status(201).end();
                console.log("Przy próbie rejestracji wykryto istniejący Login!")
            }
            else
            {
                User.create({Login: req.body.newLogin, Pass: req.body.newPassword, Email: req.body.newEmail, IP: req.connection.remoteAddress}, (err, result) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else if(result)
                    {   
                        console.log("Wlasnie ktos stworzyl konto:" + result)
                    }
                })
                res.status(200).end();
            }
        })
    }
});

app.post('/deleteuser', (req, res) => {
    console.log(req.body.userid)
    User.findOne({_id: req.body.userid}, (err) => {
        if(err)
        {
            res.status(400).end();
            console.log(err)
        }
        else
        {
            User.deleteOne({_id: req.body.userid}, (err, result) => {
                if(err)
                {
                    res.status(400).end();
                    console.log(err)
                }
                else if(res)
                {
                    res.status(200).end();
                    console.log("Ktoś usunął użyszkodnika o ID: " + req.body.userid)
                }
            })
        }
    })
})

app.put('/saveuser', (req, res) => {
    console.log(req.body.userid, req.body.userisAdmin)
        let change = User.findOneAndUpdate({_id: req.body.userid},{Login: req.body.userlogin, Pass: req.body.userpass, Email: req.body.useremail, isAdmin: req.body.userisAdmin}, {new: true}, (err, result) => {
            if(err)
            {
                res.status(400).end();
                console.log(err)
            }
            else
            {
                res.status(200).end();
                console.log(`Zaktualizowano użytkownika: ${result}`)
            }
        })
})

app.post('/newpost', (req, res) => {
    Post.create({Title: req.body.Title, Content: req.body.Content, Date: new Date().toLocaleString()}, (err, result) => {
        if(err)
        {
            res.status(400).end();
        }
        else
        {
            console.log("Utworzono posta!")
            res.status(200).end();
        }
    })
})

app.post('/newmsg', (req, res) => { 
        if(req.body.chatinput.length <= 70 && req.body.nickinput)
        {
            Message.create({msg: req.body.chatinput, nick: req.body.nickinput, Date: new Date().toLocaleString()}, (err, result) => {
                if(err)
                {
                    console.log(err);
                }
                else if(result)
                {
                    console.log("Ktos wyslal wiadomosc: " + result);
                    res.status(200).end();

                }
            });
        }
        else if(req.body.chatinput.length >= 71)
        {
            console.log("Chlop co z 1k znakow chce wyslac xd")
            res.status(400).end()
        }
        else if(req.body.nickinput.length == 0)
        {
            res.status(201).end();
        }
        else
        {
            res.status(400).end()
        }
})

app.post('/rankadd', (req, res) => {
    Rank.create({Nick: req.body.playernick, Points: req.body.playerpoints}, (err, result) => {
        if(err)
        {
            console.log(err)
            res.status(400).end();
        }
        else
        {
            console.log(`Dodano do rankingu: ${result}`)
            res.status(200).end();
        }
    })
})

app.get('/', async (req, res) =>
{
    if(req)
    {
        console.log(req.connection.remoteAddress + " - Probuje sie polaczyc!");
    }
    res.send(req.connection.remoteAddress)
})

app.get('/users', async (req, res) => {
    const users = await User.find({}).exec();

    res.json(users);
});

app.get('/posts', async (req, res) => {
    const posts = await Post.find({}).exec();

    res.json(posts)
})

app.get('/chatlog', async(req, res) => {
    const chatlogs = await Message.find({}).exec();

    res.json(chatlogs)
})

app.get('/ranking', async(req, res) => {
    const ranking = await Rank.find({}).exec();

    res.json(ranking)
})

io.on('connection', (socket) => {
    console.log('user connected')
    io.emit('welcomeMSG')
    socket.on('sendMSG', (emiting) => {
        io.emit('receivemsg', emiting)
    })
     
})