const mongoose = require('mongoose')

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
            unique: true,
        },

        name: {
            trim: true,
            type: String,
            required: 'Name is required',
        },

        isAvatarSelected: {
            default: false,
            type: Boolean,
        },

        avatarUrl: {
            default: '',
            type: String,
        },

        role: {
            type: String,
            default: 'team-manager',
            required: true,
            enum: {
                values: ['team-manager', 'team-member'],
                message: '{VALUE} is not supported',
            },
        },

        status: {
            default: 'active',
            type: String,
            enum: {
                values: ['active', 'blocked', 'deleted', 'deleted'],
                message: '{VALUE} is not supported',
            },
        },
    },
    { timestamps: true, versionKey: false }
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
