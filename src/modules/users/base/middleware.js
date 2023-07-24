const sleep = (milisecond) => {
    return new Promise((res) => {
        setTimeout(res, milisecond);
    });
};

module.exports.sleep = async (req, res, next) => {
    //do something
    await sleep(1500);
    return next();
}