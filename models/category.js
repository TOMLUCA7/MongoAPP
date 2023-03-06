import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isPublic: {
        type: Boolean,
        default: true,
    }
})

export default mongoose.model('Category', categorySchema);