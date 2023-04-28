const { faker } = require('@faker-js/faker')
const mongoose = require('mongoose')

module.exports = {
    async up(db, client) {
        const session = client.startSession()
        try {
            await session.withTransaction(async () => {
                const users = await db
                    .collection('users')
                    .find({ status: 'active' })
                    .toArray()

                const usersPromise = users.map(async (user) =>
                    db.collection('users').updateOne(
                        // eslint-disable-next-line no-underscore-dangle
                        { _id: mongoose.Types.ObjectId(user._id) },
                        { $set: { avatarUrl: faker.image.avatar() } }
                    )
                )

                await Promise.all(usersPromise)
            })
        } finally {
            await session.endSession()
        }

        // const users = await db.collection('users').find({ status: 'active' })

        // const usersPromise = users.map(async (user) =>
        //     db.collection('users').updateOne(
        //         // eslint-disable-next-line no-underscore-dangle
        //         { _id: mongoose.Types.ObjectId(user._id) },
        //         { $set: { avatarUrl: faker.image.avatar() } }
        //     )
        // )

        // // eslint-disable-next-line no-return-await
        // return await Promise.all(usersPromise)
    },

    async down(db) {
        // eslint-disable-next-line no-return-await
        return await db
            .collection('users')
            .update({ status: 'active' }, { $set: { avatarUrl: '' } })
    },
}
