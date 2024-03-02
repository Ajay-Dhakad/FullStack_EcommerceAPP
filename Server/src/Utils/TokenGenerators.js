import jwt from 'jsonwebtoken'


const generateToken = (_id) => {
    const token = jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:'10d'})
    return token
}

const verifyToken = (token) => {

    return jwt.verify(token,process.env.JWT_SECRET,(error,userId)=>{
        if(error){
            return false
        }
        return userId;
        
    })
}

export {generateToken,verifyToken}