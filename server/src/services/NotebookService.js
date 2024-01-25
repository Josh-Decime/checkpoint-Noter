import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class NotebookService {

    async getAllNotebooks() {
        const notebooks = await dbContext.Notebooks.find().populate('creator', 'name picture')
        return notebooks
    }

    async createNotebook(notebookData) {
        const notebook = await dbContext.Notebooks.create(notebookData)
        await notebook.populate('creator', 'name picture')
        return notebook
    }



}

export const notebookService = new NotebookService()