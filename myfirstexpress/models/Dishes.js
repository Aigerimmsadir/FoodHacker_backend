const mongoose = require('mongoose');


const { Schema } = mongoose;

const DishsSchema = new Schema({
  name: String,
  description: String,
  receipt:[{
  	type:Schema.Types.ObjectId, ref: 'Foods'
  }],
  author:{
  	type:Schema.Types.ObjectId, ref:'Users'
  },
  rating:Number,
  image:String,
  comments:[{
  	type:Schema.Types.ObjectId, ref: 'Comments'
  }]

});


DishsSchema.methods.toJSON = function() {
  return {
   
    name: this.name,
    description:this.description,
    receipt:this.receipt,
    author:this.author,
    rating: this.rating,
    image:this.image,
    comments:this.comments
    
  };
};

mongoose.model('Dishs', DishsSchema);