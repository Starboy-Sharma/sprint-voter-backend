const { user } = require('./utils/users')

const sockets = {}

function init(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    })

    // Socket events
    io.sockets.on('connection', (socket) => {
        /**
         * This event should be emitted after generate room.
         */
        socket.on('joinRoom', (data) => {
            try {
                const { room, userId, username } = data
                const userStatus = {}

                // check user already exists in our user list or not
                const isUserExists = user.getCurrentUser(socket.id)

                if (isUserExists) {
                    // remove user and add again in our user list
                    user.userLeave(socket.id)
                }

                const newUser = user.addUser(socket.id, username, userId, room)

                socket.join(newUser.room)
                console.log('User join room', { userId, room })

                userStatus.userId = userId
                userStatus.status = 'online'

                // Broadcast when a user connect #- Except Sender
                socket.broadcast.emit('userStatus', userStatus)
            } catch (e) {
                console.log('Bad news', e)
            }
        })

        socket.on('leaveRoom', () => {
            const userData = user.getCurrentUser(socket.id)

            console.log(`User left the room.`)

            if (userData) {
                socket.leave(userData.room)
            }

            // user.userLeave(socket.id);
        })

        // Runs when client disconnect
        socket.on('disconnect', () => {
            const userData = user.getCurrentUser(socket.id)

            console.log(userData, socket.id)

            user.userLeave(socket.id)
            const userStatus = {}

            if (!userData) {
                console.log('User not found in our users array')
                return
            }

            console.log('User left', userData)

            userStatus.userId = userData.userId
            userStatus.status = 'offline'

            // Broadcast when a user connect #- Except Sender
            socket.broadcast
                // .to(_user.room)
                .emit('userStatus', JSON.stringify(userStatus))

            if (userData) {
                io.to(userData.room).emit('message', 'user has left the chat')
            }
        })
    })
}

sockets.init = init

module.exports = sockets
