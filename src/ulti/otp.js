const speakeasy = require("speakeasy")

const otp = {
    generateUniqueSecret: () => {
        return speakeasy.generateSecret({length: 20});
      },

    generateOTPToken: (secret) => {
        return speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32'
        });
      },
      
    verifyOTPToken: (token, secret) => {
        return speakeasy.totp.verify({
          secret: secret.base32,
          encoding: 'base32',
          token: token,
          window: 6,
        });
      }
}

module.exports = otp;