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
        const entries = await dbContext.Entries.find({ notebookId: notebookId })
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

    async getMyEntries(userId) {
        const entries = await dbContext.Entries.find({ creatorId: userId }).populate('notebook')
        return entries
    }

    async editEntry(entryId, updateData, userId) {
        const entry = await dbContext.Entries.findById(entryId)
        if (!entry) {
            throw new Error(`Invalid Id: ${entryId}`)
        }
        if (entry.creatorId != userId) {
            throw new Forbidden('you can not do that')
        }
        entry.description = updateData.description ? updateData.description : entry.description
        entry.img = updateData.img != undefined ? updateData.img : entry.img
        await entry.save()
        return entry
    }

}
export const entryService = new EntryService()