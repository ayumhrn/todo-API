const successResponse = (message, data) => {
    return ({
        success: true,
        message: message,
        result: data,
    })
}

const errorResponse =  (message, err, code) => {
    return ({
        success: false,
        message: message,
        result: err,
        code: code
    })
}


module.exports = {
    successResponse,
    errorResponse
}