import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class NotebookService {

    // TODO postman wants to find only notebooks by the creator
    async getAllNotebooks() {
        const notebooks = await dbContext.Notebooks.find().populate('creator', 'name picture')
        return notebooks
    }

    // TODO needs to populate entry count
    async getNotebookById(notebookId) {
        const notebook = await dbContext.Notebooks.findById(notebookId).populate('creator', 'name picture')
        if (!notebook) {
            throw new BadRequest(`Invalid id: ${notebookId}`)
        }
        return notebook
    }

    async createNotebook(notebookData) {
        const notebook = await dbContext.Notebooks.create(notebookData)
        await notebook.populate('creator', 'name picture')
        return notebook
    }



}

export const notebookService = new NotebookService()