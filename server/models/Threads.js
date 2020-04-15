mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  thread_id : {type: String},
  title : {type: String, default: "Put title here"},
  user_id  : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date  : {type: Date, default: Date.now},
  user  : {type : mongoose.Schema.Types.String, ref: 'User'},
  body  : {type: String, default: "Insert text here"},
  likes : mongoose.Number,
  tags  : [{ tag : String }],
  replies: [{
    id  : String,
    text: {type: String, default: "Reply here"}, 
    date: {type: Date, default: Date.now},
    likes : {type: Number, default: 0},
    user: {type: mongoose.Schema.Types.String, ref: 'User'}
  }]
});
  
module.exports = mongoose.model('Thread', ThreadSchema);