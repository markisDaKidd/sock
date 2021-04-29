let express = require('express')
let config = require('./config/routes')
let app = config.app
let bcrypt = require('bcrypt')
let mongoose = require('mongoose')
let User = require('./config/models.js')
let http = config.http
let sock = config.sock
let path = require('path')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', config.router)
mongoose.connect('mongodb://mongo-service:27017/webchatusers', { useUnifiedTopology: true }).then(() => console.log('connection is open')).catch(err => console.log(err))


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public', 'index.html'))
// })





//






http.listen(3000, () => { console.log('server on') })