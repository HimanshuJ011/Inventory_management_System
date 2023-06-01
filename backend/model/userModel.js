const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name:{
        type : String,
        required:[true,"please add username"]
    },
    email:{
        type : String,
        required:[true,"please add username"],
        unique:[true,"Email is already exist"],
    },
    password:{
        type : String,
        required:[true,"please add passowrd"],
        minLength:[6,"password must be 6 characters"],
        maxLength:[70,"password not be more than 20 characters"]
    
    },
    photo :{
        type:String,
        default:"img"
    },
    bio :{
        type:String,
        maxLength:[250, "Bio must be 250 Characters"],
        default:"bio"
    },
},{
    timestamps:true

});

//  Encrypt Passowrd before saving to DB

userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        return next();
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password,salt);
    this.password = hashedPass;
    next();
})

module.exports = mongoose.model('User',userSchema);