const { default: mongoose } = require('mongoose');
const mongodb = require('mongoose');

const messageSchema = new mongoose.Schema({
     senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
     },
     recepientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref:" User",
     },
     messageType:{
          type:String,
          enum: ["text", "image"]
     },
     message:String,
     imageUrl:String,
     timeStap: {
          type:Date,
          default: Date.now,

     }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message