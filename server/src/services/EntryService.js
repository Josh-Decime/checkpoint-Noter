import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { notebookService } from "./NotebookService.js";
import { logger } from "../utils/Logger.js";

class EntryService {

    async createEntry(entryData, userId) {
        if (entryData.notebookId) {
            const notebook = await notebookService.getNotebookById(entryData.notebookId)
            if (notebook.creatorId != userId) {
                throw new Forbidden('you are not the creator')
            }
            const entry = await dbContext.Entries.create(entryData)
            await entry.populate('notebook')
            return entry
        }
        // TODO there is a way to only write this line once. Im not sure how, would be beneficial to revisit
        const entry = await dbContext.Entries.create(entryData)
        return entry
    }

    async getEntriesInNotebook(notebookId) {
        const entries = await dbContext.Entries.find({ notebookId: notebookId }).populate('creator', 'name picture')
        return entries
    }

    async deleteEntry(entryId, userId) {
        const entry = await dbContext.Entries.findById(entryId)
        if (!entry) {
            throw new BadRequest(`Invalid Id: ${entryId}`)
        }
        if (entry.creatorId != userId) {
            throw new Forbidden('You can not do that')
        }
        await entry.deleteOne()
        return `Entry deleted: ${entryId}`
    }

}
export const entryService = new EntryService()