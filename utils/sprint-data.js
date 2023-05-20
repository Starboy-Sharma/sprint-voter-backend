class Sprint {
    constructor() {
        this.sprintData = {}
    }

    getSprintData(room) {
        if (room in this.sprintData) {
            return this.sprintData[room]
        }

        return undefined
    }

    setSprintData(room, data) {
        this.sprintData[room] = data
    }
}

const sprintData = new Sprint()

module.exports = {
    sprintData,
}
