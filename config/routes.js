let express = require('express')
let app = express()
let http = require('http').Server(app)

let sock = require('socket.io')(http)

let bcrypt = require('bcrypt')

let path = require("path")
let User = require('./models')
let username;
let clients = 0;

let router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'))
})

router.post('/login', (req, res) => {
    username = req.body.user
    User.find({ user: req.body.user }, function(err, result) {
        if (!result.length)
            res.redirect('/');
        else
            bcrypt.compare(req.body.pass, result[0].pass, function(err, solution) {
                if (solution) {
                    username = req.body.user
                    res.sendFile(path.join(__dirname, '../public', 'index.html'))
                } else
                    res.redirect('/')
            });
        console.log(result[0]);

    })
})


router.get('/createaccount', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'createaccount.html'))
})


router.post('/createaccount/createuser', (req, res) => {
    let newUser = new User();
    newUser.user = req.body.user;




    User.find({ user: req.body.user }, function(err, result) {
        if (err)
            console.log(err)

        if (!result.length) {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.pass, salt, (err, hash) => {
                    newUser.pass = hash
                    newUser.save((err) => {
                        if (err) throw err
                    })
                })
            })

            res.redirect('/');
        } else
            res.redirect('/');
    })
})



router.get('/user', (req, res) => {
    res.json({ userinfo: username })
})

sock.on('connection', (admin) => {

    async function getid() {
        let id = await admin.id
        console.log(await id);
        sock.to(id).emit('save user', username)
    }
    getid()


    clients++
    console.log(clients, ' clients connected');
    //admin.send('welcome')

    admin.on('disconnect', function() {
        clients--
        console.log('A user disconnected');
    });

    admin.on('text', (data) => {
        admin.broadcast.emit('text rebuff', data)
    })
})


module.exports = { router, sock, app, http }