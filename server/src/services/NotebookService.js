import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class NotebookService {


    async getMyNotebooks(userId) {
        const notebooks = await dbContext.Notebooks.find({ creatorId: userId }).populate('creator', 'name picture')
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

    async deleteNotebook(notebookId, userId) {
        const notebook = await dbContext.Notebooks.findById(notebookId)
        if (!notebook) {
            throw new BadRequest(`invalid id: ${notebook}`)
        }
        if (notebook.creatorId != userId) {
            throw new Forbidden('You can not do that')
        }
        await notebook.deleteOne()
        return `${notebook.title} has been deleted`
    }

    async editNotebook(notebookId, updateData) {
        const notebook = await this.getNotebookById(notebookId)
        notebook.title = updateData.title ? updateData.title : notebook.title
        notebook.icon = updateData.icon ? updateData.icon : notebook.icon
        notebook.color = updateData.color ? updateData.color : notebook.color
        notebook.coverImg = updateData.coverImg ? updateData.coverImg : notebook.color
        await notebook.save()
        return notebook
    }


}

export const notebookService = new NotebookService()