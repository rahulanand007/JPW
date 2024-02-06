import mongoose from "mongoose";
import { db } from "./dbConfig.js";


let DBURI 

if(process.env.NODE_ENV === 'production'){
    DBURI = db.prod_url
}else{
    DBURI = db.local_url   
}

const connectDatabase = ()=>{
    mongoose.connect(DBURI).then((data)=>{
        console.log(`MongoDB connected with host : `+ data.connection.host)
    }).catch((error)=>{
        console.log(error)
    })
}

export {connectDatabase}
