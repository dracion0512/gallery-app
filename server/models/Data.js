const {Schema, model} = require('mongoose')

const Data = new Schema({
    id: { type: Number, unique: true, required: true },
    albumId: { type: Number, required: true },
    title: { type: String },
    url: { type: String, unique:true, required: true },
    thumbnailUrl: { type: String },
    tags: { type:Array }
    // comments: { type:Array },
    // likes: { type:Array }
})

module.exports = model('Data', Data, 'data')