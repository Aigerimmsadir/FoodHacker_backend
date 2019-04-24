const mongoose = require('mongoose');


const { Schema } = mongoose;

const FoodsSchema = new Schema({
  name: String,
  
});


FoodsSchema.methods.toJSON = function() {
  return {
   
    name: this.name,
    
  };
};

mongoose.model('Foods', FoodsSchema);