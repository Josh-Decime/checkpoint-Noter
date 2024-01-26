import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { notebookService } from "./NotebookService.js";
import { logger } from "../utils/Logger.js";

class EntryService {

    async createEntry(entryData, userId) {
        // const notebook = await notebookService.getNotebookById(entryData.notebookId)
        // const entry = await dbContext.Entries.create(entryData)
        // logger.log('notebook on entry:', notebook)
        // if (!notebook) {
        //     return entry
        // }
        // await entry.populate('notebook')
        // return entry

        if (entryData.notebookId) {
            const notebook = await notebookService.getNotebookById(entryData.notebookId)
            if (notebook.creatorId != userId) {
                throw new Forbidden('you are not the creator')
            }
            const entry = await dbContext.Entries.create(entryData)
            await entry.populate('notebook')
            return entry
        }
        const entry = await dbContext.Entries.create(entryData)
        return entry
    }

}
export const entryService = new EntryService()