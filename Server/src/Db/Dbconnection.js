 import mongoose from 'mongoose'
 
 
 export const Dbconnection = async() => {


try{    await mongoose.connect(process.env.DATABASE_URI)
console.log('connection established')
}
catch(e){

    console.log(e)

}

 }