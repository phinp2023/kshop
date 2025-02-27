const jwt = require('jsonwebtoken');

const createActivationToken = (data) => {
    return jwt.sign(data, process.env.ACTIVATION_SECRET, { expiresIn: '5m' });
};

// Create token and saving that in cookies
const sendToken = async (data, statusCode, res, isUser = true) => {
    const token = await data.getJwtToken(); // Cần kiểm tra nếu không lấy được token

    const tokenName = isUser ? 'token' : 'seller_token';

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    };

    res.status(statusCode).cookie(tokenName, token, options).json({
        success: true,
        data,
        token,
    });
};

module.exports = {
    createActivationToken,
    sendToken,
};
