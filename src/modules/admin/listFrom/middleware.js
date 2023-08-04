const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-hoangdangdev.com-green-cat-a@";
const jwt = require('../../../ulti/jwt');

module.exports.check = async (req, res, next) => {
    //do something
    if (req.cookies.user.role != 0) {
        return res.status(500).send('Page not found')
    };
    const accessTokenFromClient = req.cookies.accessToken;
        if (accessTokenFromClient) {
            try {
                const decoded = await jwt.verifyToken(accessTokenFromClient, accessTokenSecret);
                req.jwtDecodedUser = decoded.data;
                return next();
            } catch (error) {
                return res.redirect('/refreshToken');
            }
        }
        else {
            return res.redirect(`/login?retUrl=${req.originalUrl}`);
        }
}