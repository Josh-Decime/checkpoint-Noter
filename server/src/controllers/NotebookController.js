import { Auth0Provider } from "@bcwdev/auth0provider";
import { notebookService } from "../services/NotebookService.js";
import BaseController from "../utils/BaseController.js";
import { entryService } from "../services/EntryService.js";

export class NotebookController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .get('/:notebookId', this.getNotebookById)
            .get('/:notebookId/entries', this.getEntriesInNotebook)

            .use(Auth0Provider.getAuthorizedUserInfo)

            .get('', this.getMyNotebooks)
            .post('', this.createNotebook)
            .delete('/:notebookId', this.deleteNotebook)
            .put('/:notebookId', this.editNotebook)
    }

    async getMyNotebooks(request, response, next) {
        try {
            const userId = request.userInfo.id
            const notebooks = await notebookService.getMyNotebooks(userId)
            response.send(notebooks)
        } catch (error) {
            next(error)
        }
    }
    async getNotebookById(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const notebook = await notebookService.getNotebookById(notebookId)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }
    async createNotebook(request, response, next) {
        try {
            const notebookData = request.body
            const userId = request.userInfo.id
            notebookData.creatorId = userId
            const notebook = await notebookService.createNotebook(notebookData)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }


    async getEntriesInNotebook(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const entries = await entryService.getEntriesInNotebook(notebookId)
            response.send(entries)
        } catch (error) {
            next(error)
        }
    }

    async deleteNotebook(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const userId = request.userInfo.id
            const message = await notebookService.deleteNotebook(notebookId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async editNotebook(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const updateData = request.body
            const notebook = await notebookService.editNotebook(notebookId, updateData)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }



}