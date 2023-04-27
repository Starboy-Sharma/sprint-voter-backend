require('dotenv').config()

module.exports = {
    MongoURI:
        process.env.MongoURI || 'mongodb://localhost:27017/sprint-planner',
    DB: process.env.DATABASE || 'spring-planner',
}
