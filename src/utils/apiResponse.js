const apiResponse = (res,status,message,statusCode=500,data=null)=>{
    return res.status(statusCode).json({
        status,
        statusCode,
        message,
        data
    })
}

export {apiResponse}