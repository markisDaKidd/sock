let mongoose = require('mongoose')

let Schema = mongoose.Schema
let userSchema = new Schema({ user: String, pass: String })

let user = new mongoose.model('user', userSchema)


module.exports = user