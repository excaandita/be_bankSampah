const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);


const ok = (res, data, title) => {
    responseWithData(res, 200, {
        status: 200,
        message: "OK",
        data: data
    })
}

const forbidden = (res, data) => responseWithData(res, 403, {
    status: 403,
    message: "Forbidden Access",
    data: data
})

const unauthorized = (res, data) => responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized"
})

const created = (res, data) => responseWithData(res, 201, {
    status: 201,
    message: "Successfully Created"
})

const error = (res, data) => responseWithData(res, 500, {
    status: 500,
    message: "Oops! some error occurred"
})

const badRequest = (res, data) => responseWithData(res, 400, {
    status: 400,
    message: data
})
module.exports = {ok, created, unauthorized, error, badRequest, forbidden}

