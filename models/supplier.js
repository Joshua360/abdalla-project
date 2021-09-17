const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        unique:true,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      }
});




//authenticate user against database documents
userSchema.statics.authenticate = function (email, password, callback){
    user.findOne({email:email})
    .exec(function(error, user){
        if(error){
            return callback(error)
        }else if(!user){
            const err = new Error("User not found in database")
            err.status = 401;

        }


   
        //if we get through all this then compare the supplied password with the one in the db
        bcrypt.compare(password, user.password, function(error, result){
            if(result === true){
                return callback(null, user);
                
            }else{
                return callback();
            }

        });

    });

};




//hash password provided by user
userSchema.pre('save', function (next){
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err)
        }
        user.password = hash;
        next();

    })

});


const supplier = mongoose.model('Teacherdata', userSchema);
module.exports = supplier;
