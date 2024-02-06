import dotenv from "dotenv"
dotenv.config()

const db = {
    local_url: process.env.MONGO_LOCAL_URL,
    prod_url: process.env.MONGO_PROD_URL,
}


export {db}