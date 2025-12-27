import mongoose from 'mongoose';
import { type } from 'os';

const { Schema, model } = mongoose;

const userRequestSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        requestProcessor:{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
        }
        requestType: {
            type: String,
            required: false,
            enum:['Corrective', 'Preventive']
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        equipment:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment',
            required: false,
        },
        scheduleDate:{
            type: Date,
            required: false,
        },
        duration:{
            type: Number,
            required: false,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('UserRequest', userRequestSchema);