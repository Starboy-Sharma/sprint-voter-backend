const mongoose = require('mongoose')

const { Types } = mongoose.Schema

const TeamSchema = mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 3,
            required: 'Team name is required',
            unique: true,
        },

        userId: {
            type: Types.ObjectId,
            ref: 'users',
        },

        role: {
            required: true,
            type: String,
            enum: {
                values: ['team-manager', 'team-member'],
                message: '{VALUE} is not supported',
            },
        },

        companyName: {
            type: String,
            minlength: 3,
            required: true,
        },
    },
    { timestamps: true }
)

// Duplicate the ID field.
TeamSchema.virtual('id').get(function () {
    /* eslint no-underscore-dangle: 0 */
    return this._id.toHexString()
})

// Ensure virtual fields are serialised.
TeamSchema.set('toJSON', {
    virtuals: true,
})

const team = mongoose.model('teams', TeamSchema)
module.exports = team
