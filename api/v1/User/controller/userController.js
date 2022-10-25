class User {
    static login(req, res) {
        res.json({
            status: 200,
            response: {
                msg: 'Login route is working',
            },
        })
    }
}

module.exports = User
