import { Schema } from "mongoose";

export const NotebookSchema = new Schema(
    {
        title: { type: String, required: true, minLength: 3, maxLength: 25 },
        icon: { type: String, required: true },
        color: { type: String },
        coverImg: { type: String, required: true, minLength: 1, maxLength: 500 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
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
NotebookSchema.virtual('entryCount', {
    localField: '_id',
    foreignField: 'notebookId',
    ref: 'Entry',
    count: true
})