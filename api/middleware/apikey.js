const validateKey = (req, res, next) => {
    let myKyey = "aee55aa4-1546-46b9-9759-1e374e6a20da";
    let api_key = req.header('x-api-key');
    console.log(api_key);
    if (myKyey === api_key) {
        next();
    } else {
        const error = new Error('API key Not Match!');
        error.statusCode = 401;
        throw error;
    }
};

module.exports = { validateKey };