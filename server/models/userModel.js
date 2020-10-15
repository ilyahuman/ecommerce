import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

export const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        shippingAddress: {
            address: {
                type: String,
                default: '',
            },
            city: {
                type: String,
                default: '',
            },
            postalCode: {
                type: String,
                default: '',
            },
            country: {
                type: String,
                default: '',
            },
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model('User', UserSchema);
