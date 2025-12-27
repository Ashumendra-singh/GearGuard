import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const equipmentSchema = new Schema(
{
    EquimentName: { 
        type: String,
        required: true,
     },
    Employee:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Department: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
 
     },
    serialNumber: { 
        type: String,
        required: true,
        unique: true,
    
     },
    Technician: {
        type: String,
        required: true,
        trim: true
     },
    EquipmentCategory: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        trim: true
     },
    Company: {
        type: String,
        required: true,
        trim: true
     }
},
{
    timestamps: true,
    versionKey: false
});

export default model('Equipment', equipmentSchema);