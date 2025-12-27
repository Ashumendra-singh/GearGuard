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
        assigned:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
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
        },
        status: {
            type: String,
            enum: ['new', 'in-progress', 'completed'],
            default: 'new',
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('UserRequest', userRequestSchema);