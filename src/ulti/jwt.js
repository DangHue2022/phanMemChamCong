const jwt = require('jsonwebtoken');

let generateToken = (user, secretsecretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        const userData = {
            id: user.id,
            name: user.name,
            date_of_birth: user.date_of_birth,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            salary: user.salary,
        }
        jwt.sign({ data: userData }, secretsecretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife
        }, (err, token) => {
            if (err) {
                return reject(err)
            }
            resolve(token)
        })
    })
}

let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            resolve(decoded)
        })
    })
}

module.exports = {
    verifyToken: verifyToken,
    generateToken: generateToken
}