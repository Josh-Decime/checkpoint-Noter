import { Schema } from "mongoose";

export const EntrySchema = new Schema(
    {
        description: { type: String, required: true, minlength: 0, maxLength: 2000 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        img: { type: String, maxLength: 500 },
        notebookId: { type: Schema.Types.ObjectId, ref: 'Notebook' },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)
EntrySchema.virtual('notebook', {
    localField: 'notebookId',
    foreignField: '_id',
    ref: 'Notebook',
    justOne: true
})