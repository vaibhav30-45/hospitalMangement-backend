import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: String,
    qualifications: [String],
    experience: Number,
    consultationFee: Number,
    available: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Doctor", DoctorSchema);
