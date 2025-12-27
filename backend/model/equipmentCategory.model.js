import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const equipmentSchema = new Schema(
{
    name: { 
        type: String,   
        required: true,
     },
    responsible:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Company:{
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('EquipmentCategory', equipmentSchema);
