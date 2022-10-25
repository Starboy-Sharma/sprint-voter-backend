const errorMessages = {
    validationError: 'Posted data is not valid',
}

const successMessages = {
    login: 'Login Success',
}

exports.sendError = (error, res, code) => {
    console.log('exports.sendError -> error', error)

    const response = {
        success: false,
        errorCode: error.errorCode,
        message: errorMessages[error.errorCode],
        result: {
            error: error.error,
        },
        time: Date.now(),
    }

    if (response.errorCode === 'validationError') {
        response.message = response.result.error
    }

    res.status(code).json(response)
}

exports.sendSuccess = (result, res, code) => {
    const response = {
        success: true,
        successCode: result.successCode,
        message: successMessages[result.successCode],
        data: result,
        time: Date.now(),
    }
    res.status(code).json(response)
}
