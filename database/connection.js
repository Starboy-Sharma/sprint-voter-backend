const mongoose = require('mongoose')

// Create database connection
const db = require('../config/keys').MongoURI

console.log('DB', db)

class Datbase {
    constructor() {
        this._connect()
    }

    /* eslint no-underscore-dangle: 0 */
    static connect() {
        // Connect to mongo db
        mongoose
            .connect(db, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('MongoDB is connected 🫂')
            })
            .catch((error) => {
                console.error(`Error in DB connection: ${error}`)
                process.exit(1)
            })
    }
}

module.exports = Datbase.connect()
