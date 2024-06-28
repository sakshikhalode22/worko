// generate userid
exports.generateUserId = () => {
    const userId = Math.floor(Math.random() * 1000000);
    return userId.toString();
}
