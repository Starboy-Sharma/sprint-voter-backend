const mongoose = require('mongoose')

const { Types } = mongoose.Schema

const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

// Users Schema
const UserSchema = mongoose.Schema(
    {
        password: {
            required: true,
            type: String,
            minlength: 8,
            trim: true,
        },

        email: {
            required: 'Email address is required',
            trim: true,
            unique: true,
            validate: [validateEmail, 'Please enter a valid email address'],
            type: String,
        },

        username: {
            required: 'Username is required',
            trim: true,
            type: String,
        },

        teams: [
            {
                type: Types.ObjectId,
                default: [],
                ref: 'users',
            }
        ],

        status: {
            default: 'active',
            type: String,
            enum: {
                values: ['active', 'blocked', 'deleted', 'deleted'],
                message: '{VALUE} is not supported',
            },
        },
    },
    { timestamps: true }
)

// Duplicate the ID field.
UserSchema.virtual('id').get(function () {
    /* eslint no-underscore-dangle: 0 */
    return this._id.toHexString()
})

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true,
})

const user = mongoose.model('users', UserSchema)
module.exports = user
