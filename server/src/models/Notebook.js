import { Schema } from "mongoose";

export const NotebookSchema = new Schema(
    {
        Title: { type: String, required: true, minLength: 3, maxLength: 25 },
        Icon: { type: String, required: true },
        Color: { type: String },
        CoverImg: { type: String, required: true, minLength: 1, maxLength: 500 },
        CreatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)
NotebookSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})