const mongoose = require('mongoose');
const Users = mongoose.model('Users')

const { Schema } = mongoose;

const AnswersSchema = new Schema({

  content: String,
  date:{
    type: Date, default: Date.now
  },
  author:{
    type:String
  }

});


AnswersSchema.methods.toJSON = function() {
  const user = Users.findOne(_id=this.author);
  console.log(user);
  return {
   
    author:this.author,
    content:this.content,
    date:this.date,
  };
};

mongoose.model('Answers', AnswersSchema);