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

        companyName: {
            type: String,
            minlength: 3,
            required: true,
        },

        members: [
            {
                userId: { type: Types.ObjectId },
                role: {
                    type: String,
                    default: 'team-manager',
                    required: true,
                    enum: {
                        values: ['team-manager', 'team-member'],
                        message: '{VALUE} is not supported',
                    },
                },
            },
        ],
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
