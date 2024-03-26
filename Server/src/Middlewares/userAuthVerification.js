import { verifyToken } from '../Utils/TokenGenerators.js'
import {User} from '../models/userModel.js'

export default async function userAuthVerification(req,res,next) {

    const token = req.headers?.authorization?.split(' ')[1]
    
    if (!token) {
       return res.status(401).json({ error: "Access token is required to get the access" })}

    const {_id} = verifyToken(token)

    if (!_id){
        return res.status(401).json({ error: "Token is Not Valid -Expired" })
    }

    const user =await User.findById(_id).select('_id role name')

    if (!user){
        return res.status(401).json({ error: "You are not authorized to view this resource." })
    }

    req.user = user


    next()

}