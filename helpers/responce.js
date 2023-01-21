
export const successResponse = (req, res, data = {}) => {
    res.send({
        error: false,
        success: true,
        data: {
            successResult: data
        },
    })
}
export const failResponse = (req, res, data = {},extra) => {
    res.send({
        error: false,
        success: false,
        data: {
            errorResult: data,
            data:extra
        },
    })
}
export const errorResponse = (req, res, errorDesc, errorKey, resCode = 500) => {
    console.log(">>>>>>>>>>>>>   ERROR\n",errorDesc)
    try{
        // const say = require("say")
        // const Say = require('say').Say
        // const say = new Say('linux')
        // const apipath = "error " + req.originalUrl.replaceAll('/',",");
        // say.speak(apipath,"festival",1.25);
    }
    catch(error){
        console.log(error)
    }
    res.status(resCode).send({
        error: true,
        errorKey,
        errorDesc: errorDesc,
        errorMessage:errorDesc.message,
        errorStack:errorDesc.stack
    })
}
