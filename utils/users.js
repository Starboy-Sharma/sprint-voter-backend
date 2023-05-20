class User {
    constructor() {
        this.users = []
    }

    addUser(id, data) {
        this.user = { id, ...data }
        this.users.push(this.user)

        return this.user
    }

    getUsers() {
        return this.users
    }

    getCurrentUser(id) {
        return this.users.find((user) => user.id === id)
    }

    getCurrentUserByUserId(userId) {
        return this.users.find((user) => user.userId === userId)
    }

    getRoomUsers(room) {
        return this.users.filter((user) => user.room === room)
    }

    userLeave(id) {
        const index = this.users.findIndex((user) => user.id === id)

        if (index !== -1) {
            return this.users.splice(index, 1)[0]
        }

        console.warn('User is not found')
        return false
    }
}

const user = new User()

module.exports = {
    user,
}
