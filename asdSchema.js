const mongoose = require('mongoose')

const asdSchema = mongoose.Schema({
    asd: {
        type: Number
    }
})

const asdf = mongoose.model("testowa", asdSchema)
module.exports = asdf