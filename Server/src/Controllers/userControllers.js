
import { User } from "../models/userModel.js"
import { generateToken,verifyToken } from "../Utils/TokenGenerators.js"


const loginUser = async (req, res) => {
    //code to login the user

    const {email,password} = req.body

    try{
        const user = await User.loginStatic(email,password)

        const token = generateToken(user._id)

        res.status(200).json({success:true,userId:user._id,token,message:'Logged in successfully'})

    }

    catch(e){
        res.status(400).json({error: e.message})
    }

    
   
}

const signUpUser = async (req, res) => {
    //code to sign up the user

    const {name,email,password,address,phoneNumber} = req.body


    try{

        const user = await User.signUpStatic(name, email, password,address,phoneNumber)

        const token = generateToken(user._id)

        res.status(200).json({success:true,userId:user._id,token,message:'SignUp SuccessFull'})


    }
    catch(e){

        res.status(400).json({error: e.message})
    }

   
}

const getUser = async (req, res) => {
    

    
    const token = req.headers?.authorization?.split(' ')[1]

    // console.log(token)
    
    if (!token) {
       return res.status(401).json({ error: "Access token is required to get the access" })

    
    }


    
    const {_id} = verifyToken(token)

    if (!_id) {

       return res.status(401).json({ error: "Token is Not Valid -Expired" })

    }

    const user = await User.findById(_id).select("-password").populate("carts")

    if (!user){
       return res.status(401).json({ error: "You are not authorized to view this resource." })
    }

    res.status(200).json({success:true,user})






}


export {loginUser,signUpUser,getUser};