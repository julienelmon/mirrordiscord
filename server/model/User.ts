import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

export interface User extends Document {
    email: string;
    password: string;
    isadmin: boolean
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<User> = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        isadmin: {
            type: Boolean,
            default: false
        },
    },
    { 
        timestamps: true,
        versionKey: false,
    }
);

UserSchema.pre<User>('save', async function (next: any) {
    const user = this;

    if(user.isModified('password') || user.isNew) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    }

    return next();
});

UserSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    const user = this as User;
    return bcrypt.compare(password, user.password);
};

export const UserModel: Model<User> = mongoose.model<User>('User', UserSchema)