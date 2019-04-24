const mongoose = require('mongoose');


const { Schema } = mongoose;

const CommentsSchema = new Schema({

  content: String,
  date:{
    type: Date, default: Date.now,required:false
  }
  answers:[{
    type:Schema.Types.ObjectId, ref: 'Answers'
  }],
  author:{
    type:Schema.Types.ObjectId, ref:'Users'
  },
  stars:Number

});


CommentsSchema.methods.toJSON = function() {
  return {
   
    content:this.content,
    date:this.date,
    author:this.author,
    stars: this.stars,
    answers:this.answers,

  };
};

mongoose.model('Comments', CommentsSchema);