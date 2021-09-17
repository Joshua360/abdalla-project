const mongoose = require('mongoose');

const teacherOrderSchema = new mongoose.Schema({
    
    itemName:{
        type:String,
        required:true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
      }
     
});


const teacherOrder = mongoose.model('Order', teacherOrderSchema);
module.exports = teacherOrder;
