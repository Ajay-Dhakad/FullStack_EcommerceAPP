import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ["user","admin"],
        default: "user"
    },

    carts:[
        {
            type:Schema.Types.ObjectId,
            ref: "Cart",
            
        }
    ],

    address:{
        type:String,
        required:true,
    },

    phoneNumber:{
        type:Number,
        required:true,
    }


},{timestamps:true});



//LOgin the user 

userSchema.statics.loginStatic = async function(email,password) {

    if (!email ||!password) {
        throw Error("All fields are required")
    }

    if (!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    const user = await this.findOne({ email})
    

    if (!user) {
        throw Error('Email is not registered please SignUp !')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if (!isMatch) {
        throw Error('Password is incorrect')
    }

    return user;

}

//Sign up the user

userSchema.statics.signUpStatic = async function(name,email,password,address,phoneNumber) {

    if (!name || !email || !password || !address || !phoneNumber) { 

        throw Error("All fields are required")
 
}


if (!validator.isEmail(email)){
    throw Error("Email is not valid")
}

if (!validator.isStrongPassword(password)){
    throw Error("Try a strong password")
}

const exists = await this.findOne({email})

if (exists){

    throw Error('Email is already registered')

}

const hashedpassword = await bcrypt.hash(password,10)

const user  = await this.create({name,email,password:hashedpassword,address,phoneNumber})

return user;

}

export const User = mongoose.model("User", userSchema);