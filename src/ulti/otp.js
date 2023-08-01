const otplib = require('otplib');
const {authenticator} = otplib;

const otp = {
    generateUniqueSecret: () => {
        return authenticator.generateSecret()
      },

    generateOTPToken: (secret) => {
        return authenticator.generate(secret)
      },
      
    verifyOTPToken: (token, secret) => {
        return authenticator.check( token, secret )
      }
}

module.exports = {otp};