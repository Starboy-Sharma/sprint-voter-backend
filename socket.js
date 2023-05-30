const { user } = require('./utils/users')
const { sprintData } = require('./utils/sprint-data')

const sockets = {}

function init(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    })

    // Socket events
    io.sockets.on('connection', (socket) => {
        console.log('Connection request received')
        /**
         * This event should be emitted after generate room.
         */
        socket.on('joinRoom', (data) => {
            try {
                const { room, userId, username } = data
                const userStatus = {}
                const sprint = data.sprintData

                console.log('Room join request received', data)

                // check user already exists in our user list or not
                const isUserExists = user.getCurrentUser(socket.id)

                if (isUserExists) {
                    // remove user and add again in our user list
                    user.userLeave(socket.id)
                }

                const newUser = user.addUser(socket.id, data)

                socket.join(newUser.room)

                if (data.role === 'team-manager') {
                    sprintData.setSprintData(data.room, sprint)
                }

                console.log('User join room', { userId, room })

                userStatus.userId = userId
                userStatus.status = 'online'
                userStatus.username = username

                // Broadcast when a user connect #- Except Sender
                socket.broadcast.to(room).emit('userStatus', userStatus)

                // send sprint data to the user
                socket.emit(
                    'getSprintData',
                    sprintData.getSprintData(data.room)
                )
            } catch (e) {
                console.log('Bad news', e)
            }
        })

        socket.on('addVote', (data) => {
            // send vote data to all members
            socket.broadcast.to(data.room).emit('getVote', data)
            socket.emit('getVote', data)
        })

        socket.on('ticketData', (data) => {
            console.log('ticketData', data)
            socket.broadcast.to(data.room).emit('getTicketData', data)
        })

        socket.on('leaveRoom', () => {
            const userData = user.getCurrentUser(socket.id)

            console.log(`User left the room.`)

            userData.status = 'offline'

            // Broadcast when a user connect #- Except Sender
            socket.broadcast.emit('userStatus', userData)

            if (userData) {
                socket.leave(userData.room)
            }

            user.userLeave(socket.id)
        })

        // Runs when client disconnect
        socket.on('disconnect', () => {
            console.log('User disconnect 💔')
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
                .emit('userStatus', userStatus)

            if (userData) {
                io.to(userData.room).emit('message', 'user has left the chat')
            }
        })
    })
}

sockets.init = init

module.exports = sockets
