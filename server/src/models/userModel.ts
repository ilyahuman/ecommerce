import { Document, Model, model, Schema } from 'mongoose';
import { UserType } from '../types/user';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

interface UserDocument extends UserType, Document {
    _id: ObjectId;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

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

UserSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
};

export const User: Model<UserDocument> = model<UserDocument>(
    'User',
    UserSchema
);
